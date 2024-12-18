from django.urls import path
from .views import ProductListView, ProductCreateView, ProductRetrieveUpdateDestroyView, ProductForecastViewSet

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'), # Url to get Product List
    path('create/', ProductCreateView.as_view(), name='product-create'), # Url to create Product
    path('<int:pk>/', ProductRetrieveUpdateDestroyView.as_view(), name='product-retrieve-update-destroy'), # Url to
    # get,delete and update product details by ID
    path('forecast/', ProductForecastViewSet.as_view(), name='product-forecast') # URL to forecast demand, Find
    # Optimal price and save it

]
