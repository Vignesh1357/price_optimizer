from django.db import models
from users.models import User  # Import User model for relationships

# Product Model
class Product(models.Model):
    # Define choices for the category field
    CATEGORY_CHOICES = [
        ('transportation', '`Transportation`'),
        ('outdoor_sports', 'Outdoor & Sports'),
        ('wearables', 'Wearables'),
        ('electronics', 'Electronics'),
        ('apparel', 'Apparel'),
        ('home_automation', 'Home Automation'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')  # Link product to user
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)  # Add choices here
    stock_available = models.PositiveIntegerField()
    units_sold = models.PositiveIntegerField(default=0)
    customer_rating = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.name} (Created by: {self.user.username})"


# Demand Forecast Model
class DemandForecast(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='forecasts')
    forecast_data = models.PositiveIntegerField() # Data for plotting demand trajectory

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Forecast for {self.product.name}"


# Pricing Optimization Model
class PricingOptimization(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='optimizations')
    optimized_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Optimized Price for {self.product.name}: {self.optimized_price}"
