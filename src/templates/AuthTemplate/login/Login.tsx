import Button from "@mui/material/Button";

import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
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
      toast.success("Login success!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // console.log(error?.response?.data?.message);
      if (isAxiosError(error)) console.log(error);

      // toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
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
                    showPassword ? "hide the password" : "display the password"
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
    </>
  );
}
