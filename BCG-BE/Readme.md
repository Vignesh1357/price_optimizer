
# Django Application Setup Guide

Follow the steps below to set up and run the Django application. Ensure all prerequisites are met before starting.

---

## **Table of Contents**
1. [Prerequisites](#prerequisites)
2. [Before Running the Application](#before-running-the-application)
3. [Apply Database Migrations](#apply-database-migrations)
4. [Run the Application](#run-the-application)
5. [App Features](#app-features)
6. [Additional Notes](#additional-notes)

---

## **Prerequisites**
- Python 3.8 or higher
- PostgreSQL installed and configured
- A virtual environment for dependency management (recommended)

---

## **Before Running the Application**
1. **Create a PostgreSQL Database**  
   Set up a PostgreSQL database with the necessary configurations:
   - Name
   - User
   - Password
   - Host
   - Port

2. **Update `.env` File**  
   Add the following environment variables to the `.env` file in the root directory:
   ```plaintext
   DATABASE_NAME=<your_database_name>
   DATABASE_USER=<your_database_user>
   DATABASE_PASSWORD=<your_database_password>
   DATABASE_HOST=<your_database_host>
   DATABASE_PORT=<your_database_port>
   SECRET_KEY=<your_secret_key>
   DEBUG=<True_or_False>
   ```

3. **Install Required Packages**  
   Navigate to the root directory and execute the following command to install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

---

## **Apply Database Migrations**
1. Generate migration files for the models:
   ```bash
   python manage.py makemigrations
   ```
2. Apply the migrations to the database:
   ```bash
   python manage.py migrate
   ```

---

## **Run the Application**
1. Start the development server by running:
   ```bash
   python manage.py runserver
   ```
2. By default, the application will be available at:
   [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

## **App Features**

### **User Management**
- Users can register with the following details: email, first name, last name, role, and password (using Django's built-in authentication).
- Email verification using OTP (One Time Password) is implemented.
- Roles are assigned to users (Admin, Buyer, Supplier) with custom permission checks.

### **Product Management**
- Products include attributes such as:
  - Name
  - Description
  - Cost price
  - Selling price
  - Category
  - Stock availability
  - Customer rating
- Users can create, view, update, and delete products.
- Demand forecasting for products is available (using a dummy regression model in this example).
- Product pricing can be optimized based on factors like:
  - Demand forecast
  - Units sold
  - Customer rating
  - Category
  - Stock availability

---

### **Endpoints and Their Uses**

#### **User Endpoints**
- `/register/`: Allows user registration.
- `/verify-email/`: Allows email verification using OTP.
- `/login/`: Allows user login.
- `/check-username/`: Checks if a username already exists.
- `/profile/`: Retrieves user details (requires authentication).

#### **Product Endpoints**
- `/product-list/`: Retrieves a list of all products.
- `/product-create/`: Allows creation of a new product (requires authentication).
- `/product/<int:pk>/`: Allows retrieval, update, or deletion of a specific product by its ID (requires authentication).
- `/product-forecast/`: Triggers demand forecast and price optimization for products (implementation details are example-based).

---

### **Permissions**
The application uses custom permission classes to restrict access to features based on user roles (Admin, Buyer, Supplier).

---

## **Additional Notes**
- **Virtual Environment**  
  It is recommended to use a virtual environment for better dependency management. You can create and activate one as follows:
  ```bash
  python -m venv venv
  source venv/bin/activate  # On Linux/Mac
  venv\Scripts\activate     # On Windows
  ```


- **Port Configuration**  
  To run the server on a different port, specify it explicitly:
  ```bash
  python manage.py runserver <port_number>
  ```

---
