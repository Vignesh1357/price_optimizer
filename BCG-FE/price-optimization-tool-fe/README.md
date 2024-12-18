# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## **Table of Contents**

1. [Available Scripts](#available-scripts)
2. [Available Routes](#available-routes)
3. [App Features](#app-features)

---

## **Available Scripts**

In the project directory, you can run:

### `npm install`

To install all the dependencies.

### Update the Base URL

Update the Base URL in `.env` or `ApiService.jsx` file based on the port in which the application backend is running.

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- The page will reload when you make changes.
- You may also see any lint errors in the console.

---

## **Available Routes**

- `/login`
- `/register`
- `/home`
- `/product/create-and-manage`
- `/product/price-optimization`

---

## **App Features**

### **Technology Stack**

- **React**: The core JavaScript library for building user interfaces.
- **Material UI**: A popular UI component library for React, providing pre-built components for a consistent look and feel.
- **SCSS**: A CSS preprocessor for styling components efficiently.
- **Chart.js**: A JavaScript library for creating dynamic, interactive charts.

---

### **Routing**

The application utilizes React Router to manage navigation between the following routes:

- `/login`: Authentication page for existing users.
- `/register`: Registration page for new users.
- `/home`: Dashboard for authenticated users.
- `/product/create-and-manage`: Page for creating, editing, and managing products.
- `/product/price-optimization`: Page for viewing optimized product prices.

---

### **User Flow**

#### **Registration**

- User provides email, first name, last name, role, and password.
- Upon successful registration, an OTP is sent to the provided email.
- User enters the OTP to verify their email address.

#### **Login**

- User enters their email and password.
- Upon successful authentication, the user is redirected to the home page.

#### **Home Page**

Displays two main cards:

1. **Create and Manage Products**
   - Lists existing products, filtered by category or searched by name/description.
   - Allows creating new products, viewing product details, editing, and deleting products.
   - Includes a "Demand Forecast" button to trigger demand forecasting for selected products.
   - Displays a line chart for visualization of demand forecast.
2. **Optimized Prices**
   - Displays a table of products with their optimized prices, calculated based on demand forecasts and other factors.

#### **Demand Forecasting**

- User selects products for forecasting.
- The application triggers a backend API call to calculate the forecasted demand.
- A line chart, rendered using Chart.js, is displayed to visualize the forecasted demand trend.
- The chart can be customized to show various metrics, such as historical sales data, predicted demand, and confidence intervals.

#### **Logout**

- User can log out of the application, redirecting them to the login page.

---

### **Custom Hook**

The `useDebounceHook` is employed to:

1. **Username Verification**: Checks for existing usernames during registration to prevent duplicates.
2. **Product Search**: Debounces search queries in the product list to optimize API calls and improve user experience.

---
