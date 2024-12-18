from rest_framework import serializers
from .models import Product


# Product serializers
class ProductSerializer(serializers.ModelSerializer):
    forecast_data = serializers.SerializerMethodField()
    optimized_price = serializers.SerializerMethodField()
    category_display = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'user',
            'name',
            'description',
            'cost_price',
            'selling_price',
            'category',
            'category_display',
            'stock_available',
            'units_sold',
            'customer_rating',
            'forecast_data',
            'optimized_price',
        ]
        read_only_fields = ['id', 'user']

    # overriding create method
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user  # Associate the product with the logged-in user
        return super().create(validated_data)

    # Function to fetch forecast data
    def get_forecast_data(self, obj):
        forecast = obj.forecasts.last()
        return forecast.forecast_data if forecast else None

    # Function to fetch optimized price based on demand
    def get_optimized_price(self, obj):
        optimization = obj.optimizations.last()  # Assuming you want the latest optimization
        return optimization.optimized_price if optimization else None

    def get_category_display(self, obj):
        return obj.get_category_display()


# Fetch List of Products by ID list
class ProductIDListSerializer(serializers.Serializer):
    product_ids = serializers.ListField(
        child=serializers.IntegerField(),
        allow_empty=False,
        help_text="List of product IDs to filter"
    )
