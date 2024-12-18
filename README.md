# price_optimizer
# Full-Stack Application Setup Guide

This repository contains a full-stack web application designed to optimize pricing strategies through demand forecasts and market analysis. The application enables users to input product data, analyze pricing trends, and receive optimal pricing recommendations, offering a robust and user-friendly solution for businesses aiming to stay competitive in a dynamic market.

---

## **Table of Contents**

1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
3. [App Features](#app-features)
   - [Backend Features](#backend-features)
   - [Frontend Features](#frontend-features)
4. [Understanding of the Assignment](#understanding-of-the-assignment)

---

## **Overview**

The project is designed to address the critical need for efficient pricing strategies in the digital era. By combining scalable code, intuitive design, and advanced data analysis, this web application integrates several functionalities to provide business users with actionable insights into pricing optimization, while maintaining performance efficiency and ease of use.

---

## **Setup Instructions**

### **Backend Setup**

1. **Prerequisites**

   - Python 3.8 or higher
   - PostgreSQL installed and configured
   - A virtual environment for dependency management (recommended)

2. **Before Running the Application**

   - **Create a PostgreSQL Database**: Set up a database with required configurations.
   - **Update `.env` File**: Add the following variables:
     ```plaintext
     DATABASE_NAME=<your_database_name>
     DATABASE_USER=<your_database_user>
     DATABASE_PASSWORD=<your_database_password>
     DATABASE_HOST=<your_database_host>
     DATABASE_PORT=<your_database_port>
     SECRET_KEY=<your_secret_key>
     DEBUG=<True_or_False>
     ```
   - **Install Dependencies**: Run the command below to install packages:
     ```bash
     pip install -r requirements.txt
     ```

3. **Apply Database Migrations**

   - Generate and apply migrations:
     ```bash
     python manage.py makemigrations
     python manage.py migrate
     ```

4. **Run the Backend**
   - Start the development server:
     ```bash
     python manage.py runserver
     ```
   - By default, the backend will be available at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

---

### **Frontend Setup**

1. **Install Dependencies**

   - Navigate to the frontend directory and run:
     ```bash
     npm install
     ```

2. **Update Base URL**

   - Update the base URL in `.env` or `ApiService.jsx` based on the backend port.

3. **Run the Frontend**
   - Start the development server:
     ```bash
     npm start
     ```
   - The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## **App Features**

### **Backend Features**

#### **User Management**

- Registration with email, name, role, and password.
- Email verification using OTP.
- Role-based access control with custom permissions.

#### **Product Management**

- CRUD operations for products.
- Demand forecasting and price optimization.

#### **Endpoints**

- `/register/`, `/verify-email/`, `/login/`, `/product-list/`, and more.

---

### **Frontend Features**

#### **Technology Stack**

- **React**: The core JavaScript library for building user interfaces.
- **Material UI**: A popular UI component library for React, providing pre-built components for a consistent look and feel.
- **SCSS**: A CSS preprocessor for styling components efficiently.
- **Chart.js**: A JavaScript library for creating dynamic, interactive charts.

#### **Routing**

The application utilizes React Router to manage navigation between the following routes:

- `/login`: Authentication page for existing users.
- `/register`: Registration page for new users.
- `/home`: Dashboard for authenticated users.
- `/product/create-and-manage`: Page for creating, editing, and managing products.
- `/product/price-optimization`: Page for viewing optimized product prices.

#### **User Flow**

1. **Registration**

   - User provides email, first name, last name, role, and password.
   - Upon successful registration, an OTP is sent to the provided email.
   - User enters the OTP to verify their email address.

2. **Login**

   - User enters their email and password.
   - Upon successful authentication, the user is redirected to the home page.

3. **Home Page**

   - Displays two main cards:
     1. **Create and Manage Products**
        - Lists existing products, filtered by category or searched by name/description.
        - Allows creating new products, viewing product details, editing, and deleting products.
        - Includes a "Demand Forecast" button to trigger demand forecasting for selected products.
        - Displays a line chart for visualization of demand forecast.
     2. **Optimized Prices**
        - Displays a table of products with their optimized prices, calculated based on demand forecasts and other factors.

4. **Demand Forecasting**

   - User selects products for forecasting.
   - The application triggers a backend API call to calculate the forecasted demand.
   - A line chart, rendered using Chart.js, is displayed to visualize the forecasted demand trend.
   - The chart can be customized to show various metrics, such as historical sales data, predicted demand, and confidence intervals.

5. **Logout**
   - User can log out of the application, redirecting them to the login page.

---

## **Understanding of the Assignment**

During the development process, the following points were emphasized:

1. **Good Practices**: Clean, scalable code with proper comments and structured components.
2. **Documentation**: Comprehensive guides for setup, functionality, and troubleshooting.
3. **Security**: Ensuring secure data handling, role-based access, and reliable authentication.
4. **User Experience**: Intuitive UI/UX and responsive design.
5. **Maintainability**: Clear separation of concerns between backend and frontend, reusable code components, and detailed documentation.

This project demonstrates an understanding of building a full-stack application that balances functionality, performance, and maintainability while prioritizing security and scalability.

---

