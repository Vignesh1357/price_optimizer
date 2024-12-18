from decimal import Decimal
from sklearn.linear_model import LinearRegression
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder


# Dummy function to simulate forecasted demand based on available product data
def forecast_demand(product):
    """
    Forecast demand using available product data (e.g., units sold, available stock, rating, etc.).
    A simple regression model can predict future demand based on these factors.

    Args:
        product (Product): A Product model instance.

    Returns:
        float: Forecasted demand for the next period.
    """
    # Sample data: In practice, you would gather historical data points from your database.
    data = {
        'units_sold': [100, 150, 200, 250, 300],  # Example units sold for past periods
        'stock_available': [50, 40, 30, 20, 10],  # Available stock at the time
        'rating': [4.5, 4.7, 4.2, 4.3, 4.8],  # Customer rating
        'cost_price': [30, 35, 32, 33, 31],  # Cost price for the product
        'selling_price': [50, 55, 53, 60, 58],  # Selling price for the product
        'category': ['electronics', 'apparel', 'electronics', 'home_automation', 'wearables']  # Categories as strings
    }

    # Convert to DataFrame
    df = pd.DataFrame(data)

    # Encoding the categorical 'category' field using LabelEncoder
    label_encoder = LabelEncoder()
    df['category_encoded'] = label_encoder.fit_transform(df['category'])

    # Features (input columns)
    X = df[['units_sold', 'stock_available', 'rating', 'cost_price', 'selling_price', 'category_encoded']]

    # Target (output column: forecasted demand, which is units sold in this case)
    y = df['units_sold']

    # Fit a simple linear regression model (you can replace this with other models if needed)
    model = LinearRegression()
    model.fit(X, y)

    # Prepare input data for the product
    if product.customer_rating:
        product_data = np.array([[
            product.units_sold,  # units sold
            product.stock_available,  # stock available
            product.customer_rating,  # rating
            product.cost_price,  # cost price
            product.selling_price,  # selling price
            product.category  # category (string)
            ]])
    else:
        product_data = np.array([[
            product.units_sold,  # units sold
            product.stock_available,  # stock available
            4,  # rating
            product.cost_price,  # cost price
            product.selling_price,  # selling price
            product.category  # category (string)
        ]])

    # Encode the product's category
    product_data[:, 5] = label_encoder.transform([product_data[:, 5][0]])

    # Predict the demand for the next period
    forecasted_demand = model.predict(product_data)[0]

    return forecasted_demand


# Function to optimize the price based on forecasted demand, units sold, and other factors
def calculate_optimized_price(product):
    """
    Calculate an optimized price for a product based on forecasted demand, units sold, and other factors.
    The optimized price should never exceed the cost price and should be greater than zero.

    Args:
        product (Product): A Product model instance with relevant data.

    Returns:
        float: The optimized price for the product.
    """
    # Extract product data and ensure correct formats
    cost_price = Decimal(str(product.cost_price))  # Ensure Decimal format for precision
    forecast_data = forecast_demand(product)  # Get forecasted demand using regression model
    units_sold = int(product.units_sold)
    rating = Decimal(str(product.customer_rating)) if product.customer_rating else Decimal(0)
    category = product.category
    stock_available = int(product.stock_available)

    # Category-based multipliers (example, you can adjust these as needed)
    category_multipliers = {
        'electronics': Decimal('1.05'),
        'apparel': Decimal('1.03'),
        'wearables': Decimal('1.07'),
        'home_automation': Decimal('1.1'),
        'outdoor_sports': Decimal('1.02'),
        'transportation': Decimal('1.05')
    }

    category_factor = category_multipliers.get(category, Decimal('1.0'))  # Default multiplier for unknown categories

    # Adjust base price based on forecasted demand and units sold
    demand_factor = Decimal(forecast_data) / Decimal(units_sold + 1)  # Avoid division by zero
    rating_factor = Decimal(1 + rating / 10)  # Assuming rating is between 0 and 10

    # Stock adjustment (increase price if stock is low)
    stock_factor = Decimal(1 + (100 - stock_available) / 100)

    # Calculate the optimized price using all factors
    base_price = cost_price * category_factor
    price_adjustment = demand_factor * rating_factor * stock_factor

    # Apply a soft cap to ensure the optimized price is close to the cost price
    optimized_price = base_price * price_adjustment

    # Ensure the optimized price is never less than a small fraction of the cost price
    min_price = cost_price * Decimal('0.95')  # Allow a small reduction (up to 5% off cost price)
    if optimized_price < min_price:
        optimized_price = min_price

    # Ensure the optimized price is never higher than the cost price
    if optimized_price > cost_price:
        optimized_price = cost_price

    return round(optimized_price, 2)  # Round to 2 decimal places for currency
