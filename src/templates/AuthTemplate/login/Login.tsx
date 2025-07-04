import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuhtHeader from "./authHeader/AuhtHeader";
import { axiosInstance } from "../../../services/axiosInstance";
import { ADMIN_URLS } from "../../../services/apiEndpoints";
import { isAxiosError } from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const { register, handleSubmit } = useForm();

  // =========== submit login ========
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(ADMIN_URLS.USER.LOGIN, data);
      console.log(response);
      // localStorage.setItem("token", response?.data?.token);
      // await saveLoginData();
      // await getCurrentUser();
      // toast.success("Login success!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // console.log(error?.response?.data?.message);
      if (isAxiosError(error)) console.log(error);

      // toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <Grid container sx={{ height: "100vh" }}>
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
            <AuhtHeader header={"Login !"} />
            <form>
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                placeholder="Please type here ..."
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Please type here ..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}{" "}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mb: 2 }} textAlign="right">
                <Link to="/forget_pass" variant="body2" underline="none">
                  Forgot Password ?
                </Link>
              </Box>

              <Button fullWidth variant="contained" size="large">
                Login
              </Button>
            </form>
          </Container>
        </Grid>

        {/* Right Side: Image */}
        <Grid size={{ xs: 0, md: 6 }} sx={{ padding: "1rem" }}>
          <Grid
            sx={{
              backgroundImage: `url("/loginbg.svg")`,              
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: { xs: "none", md: "block" },
              position: "relative",
              height: "100%",
              borderRadius: "1rem",
              "&::after": {
                content: '""',
                position: "absolute"
                
              }
            }}
          ></Grid>
        </Grid>
      </Grid>
    </>
  );
}
