import React, { useEffect, useState } from "react";
import "./asset/css/login.css";
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  Typography,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { BiLogIn } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../fetures/slices/user/userThunk";

const validationSchema = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().email().required(),
});

const Login = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (value, e) => {
    e.preventDefault();
    dispatch(loginUser(value));
  };
  const navigate = useNavigate();
  const userState = useSelector((state) => state.auth);
  useEffect(() => {
    if (userState.isError === true) {
      setOpen(true);
    }
    if (userState.isSuccess === true) {
      setOpen(true);
      navigate("/");
    }
  }, [userState, navigate]);

  return (
    <div className="login_background">
      {userState.isSuccess === true && (
        <Snackbar
          open={open}
          autoHideDuration={5000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {userState.successMessage}
          </Alert>
        </Snackbar>
      )}
      {userState.isError === true && (
        <Snackbar
          open={open}
          autoHideDuration={5000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {userState.errorMessage}
          </Alert>
        </Snackbar>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper elevation={3} sx={{ padding: "20px", maxWidth: "400px" }}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: "center", marginBottom: "20px" }}
          >
            Login
          </Typography>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <TextField
                label="Email Address"
                type="email"
                size="small"
                name="email"
                {...register("email")}
                sx={{ marginBottom: "20px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiLogIn />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your email address"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                label="Password"
                size="small"
                name="password"
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
              />
            </Box>
            <Box
              sx={{ margin: "15px 0 10px 0", fontSize: 12, textAlign: "end" }}
            >
              <Typography
                component="span"
                sx={{ fontSize: 15, textAlign: "end" }}
              >
                <Link to="/forgetPassword">forget Password ?</Link>
              </Typography>
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "20px" }}
              fullWidth
              disabled={errors.email || errors.password ? true : false}
              className="loginBtn"
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
