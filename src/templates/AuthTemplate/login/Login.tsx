import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  Box,
  colors,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import AuhtHeader from "./authHeader/AuhtHeader";
import { axiosInstance } from "../../../services/axiosInstance";
import { ADMIN_URLS } from "../../../services/apiEndpoints";
import { isAxiosError } from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  // =========== submit login ========
  const onSubmit = async (data: any) => {
    try {
      const response = await axiosInstance.post(ADMIN_URLS.USER.LOGIN, data);
      console.log(response);
      localStorage.setItem("token", response?.data?.token);
      // await saveLoginData();
      // await getCurrentUser();
      // toast.success("Login success!");
      // navigate("/dashboard", { replace: true });
    } catch (error) {
      // console.log(error?.response?.data?.message);
      if (isAxiosError(error)) console.log(error);

      // toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <Grid container height={"100vh"}>
        {/* Left Side: Form */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
          }}
        >
          <Container maxWidth="sm">
            {/* Logo in Top-Left */}
            <Box
              sx={{
                position: {
                  xs: "static",
                  md: "absolute",
                },
                top: {
                  md: "3rem",
                },
                left: {
                  md: "3rem",
                },
                width: {
                  xs: "100%",
                  md: "auto",
                },
                textAlign: {
                  xs: "center",
                  md: "left",
                },
                fontSize: "26px",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#3252DF" }}>Stay</span>
              <span style={{ color: "#152C5B" }}>cation.</span>
            </Box>
            <AuhtHeader
              header={"Sign in"}
              linkName={"Register here!"}
              message={"If you don’t have an account register You can"}
              link={"./register"}
            />
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type={"text"}
                  label="Email"
                  {...register("email")}
                />
              </FormControl>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleTogglePassword}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  {...register("password")}
                />
              </FormControl>

              <Box sx={{ mb: 2 }} textAlign="right">
                <Link to="/forgot-password">Forgot Password ?</Link>
              </Box>

              <Button
                className="bgBlue"
                fullWidth
                variant="contained"
                size="large"
                type="submit"
              >
                Login
              </Button>
            </Box>
          </Container>
        </Grid>

        {/* Right Side: Image */}
        <Grid size={{ xs: 0, md: 6 }} sx={{ padding: "1rem" }}>
          <Box
            sx={{
              backgroundImage: `url("/loginbg.svg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: { xs: "none", md: "flex" },
              position: "relative",
              height: "100%",
              borderRadius: "1rem",
              overflow: "hidden",
              alignItems: "flex-end",
              justifyContent: "start",
            }}
          >
            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(23, 33, 33, 0.53)",
                zIndex: 1,
              }}
            />

            {/* Text content above overlay */}
            <Box m={4} sx={{ position: "relative", zIndex: 2, color: "white" }}>
              <Typography variant="h4" fontWeight="bold">
                Sign in to Roamhome
              </Typography>
              <Typography mt={1}>Homes as unique as you.</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
