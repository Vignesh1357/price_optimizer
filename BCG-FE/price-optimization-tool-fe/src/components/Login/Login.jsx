import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import BCGLogo from "../../Assets/Images/BCG_Logo.png";
import "./Login.scss";
import { apiCall } from "../../Utils/ApiService/ApiService";
import { useNavigate } from "react-router-dom";

// Login Page
const Login = () => {
  const navigate = useNavigate();

  // Component states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response = await apiCall("post", "/login/", {
      username: email,
      password: password,
    });
    if (response.data) {
      // Storing tokens and user details in localstorage
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("user", response.data.first_name);

      // Redirecting back to home
      navigate("/home");
    } else {
      window.alert(response);
    }
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <div className="login-card">
        <div>
          <img className="logo" src={BCGLogo} alt="logo" />
        </div>
        <div className="form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
              padding: 2,
            }}
          >
            <Typography variant="h2" component="h1" gutterBottom>
              Login
            </Typography>
            <Box
              component="form"
              sx={{
                width: "100%",
                maxWidth: 400,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
              >
                {loading && (
                  <CircularProgress
                    size={20}
                    style={{ margin: "0 10px" }}
                    color="black"
                  />
                )}
                Login
              </Button>
              <Typography variant="h6" component="h6" gutterBottom>
                Don't have an account? <Link href="/register">Sign up</Link>
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Login;
