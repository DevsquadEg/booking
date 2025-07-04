import Button from "@mui/material/Button";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../services/axiosInstance";
import { ADMIN_URLS } from "../../../services/apiEndpoints";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import AuhtHeader from "../../../components/AuthComponents/authHeader/AuhtHeader";
import RightSideImage from "../../../components/AuthComponents/rightSideImage/RightSideImage";
import Logo from "../../../components/AuthComponents/Logo/Logo";

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
      localStorage.setItem("token", response?.data.data.token);
      // await saveLoginData();
      // await getCurrentUser();
      toast.success("Login success!");
      navigate("/dashboard");
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
            <Logo />
            <AuhtHeader
              header={"Sign in"}
              message={"If you don’t have an account register You can"}
              linkName={"Register here!"}
              link={"./register"}
            />
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <InputLabel>Email</InputLabel>
              <FormControl fullWidth margin="dense" variant="standard">
                <OutlinedInput
                  id="outlined-adornment-email"
                  type={"text"}
                  // placeholder="Email"
                  {...register("email")}
                />
              </FormControl>

              {/* =============== password ========================== */}
              <InputLabel>Password</InputLabel>
              <FormControl fullWidth margin="dense" variant="standard">
                <OutlinedInput
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
        <RightSideImage
          text="Homes as unique as you."
          title="Sign in to Roamhome"
          imgPath="/loginbg.svg"
        />
      </Grid>
    </>
  );
}
