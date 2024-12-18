from rest_framework import generics, filters, status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import Product, DemandForecast, PricingOptimization
from .serializers import ProductSerializer, ProductIDListSerializer
from users.permissions import IsAdmin, IsBuyer, IsSupplier, Or
from rest_framework.views import APIView

from .utils import forecast_demand, calculate_optimized_price

import logging

logger = logging.getLogger(__name__)


# Pagination class
class CustomPagination(PageNumberPagination):
    page_size = 10  # Number of items per page
    page_size_query_param = 'page_size'
    max_page_size = 100


# List Products (For Buyers and Suppliers)
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsBuyer | IsSupplier | IsAdmin]  # Allow all roles to view products
    pagination_class = CustomPagination

    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'description']  # Search by name and description
    filterset_fields = ['category']  # Filter by category

    def get_queryset(self):
        # Buyers can view all products, while suppliers can only view their own, and admins can see all.
        user = self.request.user

        if user.role and user.role.name in ['buyer', 'admin']:
            # Buyers and admins can see all products
            return self.queryset

        if user.role and user.role.name == 'supplier':
            # Suppliers can only see products they created
            return self.queryset.filter(user=user)

        # In case the user has no role, return an empty queryset
        return Product.objects.none()


# Create Product (For Suppliers and Admins only)
class ProductCreateView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, IsSupplier | IsAdmin]  # Only suppliers and admins can create


# Retrieve, Update, and Delete a Product (For Suppliers and Admins only)
class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.IsAuthenticated(), Or(permission_classes=[IsAdmin, IsBuyer, IsSupplier])]
        else:
            return [permissions.IsAuthenticated(), Or(permission_classes=[IsAdmin, IsSupplier])]

    def get_queryset(self):
        user = self.request.user
        logger.debug(f"User role: {user.role.name}")  # Log the role of the user

        if user.role.name in ['buyer', 'admin']:
            # For buyers, return all products (view-only access)
            # Make sure products are not filtered for buyers, they can see all
            return self.queryset.all()

        if user.role.name == 'supplier':
            # Suppliers and admins can only view products they created
            return self.queryset.filter(user=user)

        return self.queryset.none()  # If user is neither, return nothing


class ProductForecastViewSet(APIView):
    permission_classes = [permissions.IsAuthenticated, IsSupplier | IsAdmin]

    def post(self, request):
        serializer = ProductIDListSerializer(data=request.data)
        if serializer.is_valid():
            product_ids = serializer.validated_data['product_ids']
            # Filter products by IDs
            filtered_products = Product.objects.filter(id__in=product_ids)

            response_data = []  # Initialize response data list

            for product in filtered_products:
                # Calculate forecasted sales
                forecasted_sales = forecast_demand(product)

                # Store the forecast in the DemandForecast model
                DemandForecast.objects.update_or_create(
                    product=product,
                    defaults={'forecast_data': forecasted_sales},
                )
                # Calculate the optimized price for the product
                optimized_price = calculate_optimized_price(product)

                # Save the optimized price in the PricingOptimization model
                PricingOptimization.objects.update_or_create(
                    product=product,
                    defaults={'optimized_price': optimized_price}
                )
                response_data.append({
                    "product_id": product.id,
                    "name": product.name,
                    "description": product.description,
                    "category": product.category,
                    "cost_price": str(product.cost_price),
                    "selling_price": str(product.selling_price),
                    "stock_available": product.stock_available,
                    "units_sold": product.units_sold,
                    "customer_rating": str(product.customer_rating),
                    "forecast_data": forecasted_sales,
                    "optimized_price": str(optimized_price),
                })

            return Response({"message": "Forecast data successfully saved.", "products": response_data},
                            status=status.HTTP_200_OK)

        return Response({"message": "Invalid input data."}, status=status.HTTP_400_BAD_REQUEST)
