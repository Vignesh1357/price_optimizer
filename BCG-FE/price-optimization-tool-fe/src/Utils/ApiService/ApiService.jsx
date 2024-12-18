import axios from "axios";
let userBaseUrl = "http://127.0.0.1:8000/api/users";
let productsBaseUrl = "http://127.0.0.1:8000/api/products";

// API service to handle all the api calls in one place
export const apiCall = async (
  method,
  endpoint,
  payload = {},
  type = "user",
  queryParams = {}
) => {
  let baseUrl;
  if (type === "user") {
    baseUrl = process.env.REACT_APP_USER_BASE_URL;
  } else {
    baseUrl = process.env.REACT_APP_PRODUCT_BASE_URL;
  }

  // Public routes
  const routes = [
    "/login/",
    "/register/",
    "/check-username/",
    "/verify-email/",
  ];

  let config = {};
  if (!routes.includes(endpoint)) {
    let token = localStorage.getItem("accessToken");
    if (token) {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: queryParams,
      };
    }
  }
  switch (method) {
    case "post":
      try {
        const response = await axios.post(baseUrl + endpoint, payload, config);
        return response;
      } catch (err) {
        console.error("Request failed:", err);
        return err;
      }
    case "get":
      try {
        const response = await axios.get(baseUrl + endpoint, config);
        return response;
      } catch (err) {
        console.error("Request failed:", err);
        return err;
      }
    case "put":
      try {
        const response = await axios.put(baseUrl + endpoint, payload, config);
        return response;
      } catch (err) {
        console.error("Request failed:", err);
        return err;
      }
    case "delete":
      try {
        const response = await axios.delete(baseUrl + endpoint, config);
        return response;
      } catch (err) {
        console.error("Request failed:", err);
        return err;
      }
  }
};
