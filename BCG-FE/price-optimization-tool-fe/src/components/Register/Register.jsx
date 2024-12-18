import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  FormHelperText,
  Link,
} from "@mui/material";
import BCGLogo from "../../Assets/Images/BCG_Logo.png";
import "../Login/Login.scss";
import { apiCall } from "../../Utils/ApiService/ApiService";
import { useNavigate } from "react-router-dom";
import { useDebounceHook } from "../../Utils/CustomHooks/useDebounceHook.jsx";
// component for user registration
const Register = () => {
  const navigate = useNavigate();
  // component states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  // Custom hook call to validate email
  const debouncedValue = useDebounceHook(email, 500);

  useEffect(() => {
    async function checkEmail() {
      if (email) {
        const response = await apiCall("post", "/check-username/", {
          username: email,
        });
        if (response.status === 200) {
          setIsEmailExists(false);
        } else {
          setIsEmailExists(true);
        }
      }
    }
    checkEmail();
  }, [debouncedValue]);

  useEffect(() => {
    setHasErrors(Object.keys(errors).length !== 0 || isEmailExists);
  }, [errors, isEmailExists]);

  // Function to validate the form values
  const validateForm = () => {
    const formErrors = {};
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // First Name Validation
    if (!firstName) formErrors.firstName = "First name is required";

    // Last Name Validation
    if (!lastName) formErrors.lastName = "Last name is required";

    // Email Validation
    if (!email) formErrors.email = "Email is required";
    else if (!emailRegex.test(email)) formErrors.email = "Invalid email format";

    // Account Type Validation
    if (!accountType) formErrors.accountType = "Account type is required";

    // Password Validation
    if (!password) formErrors.password = "Password is required";

    // Confirm Password Validation
    if (!confirmPassword)
      formErrors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Function to handle Registration logic
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      if (validateForm()) {
        setLoading(true);
        let response = await apiCall("post", "/register/", {
          first_name: firstName,
          last_name: lastName,
          role: accountType,
          email: email,
          username: email,
          password: password,
        });
        if (response.status === 201) {
          setIsOtpSent(true);
          window.alert(response.data.message);
        } else {
          window.alert(response);
        }
        setLoading(false);
      }
    } else {
      if (otp) {
        setLoading(true);
        let response = await apiCall("post", "/verify-email/", {
          email: email,
          otp: otp,
        });
        if (response.status === 200) {
          window.alert("Account Successfully Created!");
          navigate("/login");
        } else {
          window.alert(response.response.data.message);
        }
        setLoading(false);
      } else {
        window.alert("Please enter otp.");
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="login-card">
        <div>
          <img className="logo" src={BCGLogo} alt="logo" />
        </div>
        <div className="form">
          <>
            {isOtpSent ? (
              <Box
                component="form"
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "80vh",
                  gap: 2,
                }}
                onSubmit={handleRegister}
              >
                <Typography variant="h2" component="h1" gutterBottom>
                  Verify-Email
                </Typography>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  disabled
                />
                <TextField
                  label="OTP"
                  variant="outlined"
                  fullWidth
                  required
                  value={otp}
                  type="number"
                  helperText="Please enter 6 digit OTP recieved on you mail."
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={loading}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  disabled={otp.length === 6 ? false : true}
                >
                  {loading && (
                    <CircularProgress
                      size={20}
                      style={{ margin: "0 10px" }}
                      color="black"
                    />
                  )}{" "}
                  Verify
                </Button>
              </Box>
            ) : (
              <Box
                component="form"
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "80vh",
                  gap: 2,
                }}
                onSubmit={handleRegister}
              >
                <Typography variant="h2" component="h1" gutterBottom>
                  Register
                </Typography>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  disabled={loading}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  disabled={loading}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email || isEmailExists}
                  helperText={
                    errors.email ||
                    (isEmailExists && "Account with this email already exist.")
                  }
                  disabled={loading}
                />
                <FormControl fullWidth required error={!!errors.accountType}>
                  <InputLabel>Account Type</InputLabel>
                  <Select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    disabled={loading}
                  >
                    <MenuItem value="buyer">Buyer</MenuItem>
                    <MenuItem value="supplier">Supplier</MenuItem>
                  </Select>
                  {errors.accountType && (
                    <FormHelperText>{errors.accountType}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  disabled={loading}
                />
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  disabled={loading}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  disabled={hasErrors}
                >
                  {loading && (
                    <CircularProgress
                      size={20}
                      style={{ margin: "0 10px" }}
                      color="black"
                    />
                  )}
                  Register
                </Button>
                <Typography variant="h6" component="h6" gutterBottom>
                  Already have an account? <Link href="/login">Log in</Link>
                </Typography>
              </Box>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Register;
