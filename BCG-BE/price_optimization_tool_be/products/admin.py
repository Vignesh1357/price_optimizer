from django.contrib import admin
from .models import Product, DemandForecast, PricingOptimization

# Registering models with admin site
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'cost_price', 'selling_price', 'stock_available', 'units_sold')

@admin.register(DemandForecast)
class DemandForecastAdmin(admin.ModelAdmin):
    list_display = ('product', 'forecast_data','created_at')

@admin.register(PricingOptimization)
class PricingOptimizationAdmin(admin.ModelAdmin):
    list_display = ('product', 'optimized_price', 'created_at')
