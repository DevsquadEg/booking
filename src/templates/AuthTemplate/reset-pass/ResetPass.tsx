import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import loginBg from "../../../assets/imgs/reset-password.png";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";

// mui imports
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid";
import type { ResetPasswordProps } from "../../../interfaces/interfaces";
import { baseURL, PORTAL_URLS } from "../../../services/apiEndpoints";
import validation from "../../../services/validation";
import { Container, OutlinedInput } from "@mui/material";
import AuhtHeader from "../../../components/AuthComponents/authHeader/AuhtHeader";
import Logo from "../../../components/AuthComponents/Logo/Logo";
import { Alert } from "@mui/material";
import SubmitBtn from "../../../layouts/AuthLayout/submitBtn";
import RightSideImage from "../../../components/AuthComponents/rightSideImage/RightSideImage";

export default function ResetPass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<ResetPasswordProps>({
    mode: "onChange",
    defaultValues: {
      email: location.state ? location.state.userEmail : "",
    },
  });

  // handle confirmed password when password change
  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "password") trigger("confirmPassword");
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  // reset password

  const handleResetPassword = useCallback(
    async function (userInfo: ResetPasswordProps) {
      const toastId = toast.loading("Waiting....");

      try {
        const options = {
          method: "POST",
          url: `${PORTAL_URLS.USER.RESET_PASSWORD}`,
          data: userInfo,
        };
        const { data } = await axios.request(options);
        if (data.success) {
          toast.success("Password Reset Successfully");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message || " Some thing go Wrong !");
        }
      } finally {
        toast.dismiss(toastId);
      }
    },
    [navigate]
  );

  // handle functions for password input

  // handle function for confirmed password
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Grid container sx={{ height: "100vh" }}>
        {/* left side */}
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
              header={"Reset Password"}
              message={"If you already have an account register "}
              linkName={"Login here!"}
              link={"/login"}
            />
            <form onSubmit={handleSubmit(handleResetPassword)}>
              {/* =================== Email Address ===================== */}
              <Box
                sx={{
                  mt: "1rem",
                }}
              >
                <InputLabel
                  sx={{
                    color: "var(--dark-blue-color)",
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  Email Address
                </InputLabel>
                <FormControl
                  fullWidth
                  sx={{
                    margin: { top: ".3rem", bottom: "35px" },
                    background: "#f5f6f8",
                  }}
                  variant="standard"
                >
                  <OutlinedInput
                    placeholder="Please type here ..."
                    id="outlined-adornment-email"
                    type={"text"}
                    // placeholder="Email"
                    {...register("email", validation.EMAIL_VALIDATION)}
                  />
                </FormControl>
                {errors.email && (
                  <Alert sx={{ marginBottom: "1rem" }} severity="error">
                    {errors.email.message}
                  </Alert>
                )}
              </Box>

              {/* =================== OTP ===================== */}

              <Box
                sx={{
                  mt: "1.5rem",
                }}
              >
                <InputLabel
                  sx={{
                    color: "var(--dark-blue-color)",
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  OTP
                </InputLabel>
                <FormControl
                  fullWidth
                  sx={{
                    margin: { top: ".3rem", bottom: "35px" },
                    backgroundColor: "#F5F6F8",
                  }}
                  variant="standard"
                >
                  <OutlinedInput
                    placeholder="Please type here ..."
                    type={"text"}
                    {...register("seed", {
                      required: "OTP is required",
                    })}
                  />
                </FormControl>
                {errors.seed && (
                  <Alert sx={{ marginBottom: "1rem" }} severity="error">
                    {errors.seed.message}
                  </Alert>
                )}
              </Box>

              {/* =================== Password ===================== */}
              <Box
                sx={{
                  mt: "1rem",
                }}
              >
                <InputLabel
                  sx={{
                    color: "var(--dark-blue-color)",
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  Password
                </InputLabel>
                <FormControl
                  fullWidth
                  sx={{
                    mt: ".3rem",
                    background: "#f5f6f8",
                  }}
                  variant="standard"
                >
                  <OutlinedInput
                    placeholder="Please type here ..."
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
                    {...register(
                      "password",
                      validation.PASSWORD_VALIDATION(watch("password"))
                    )}
                  />
                </FormControl>
                {errors.password && (
                  <Alert severity="error">{errors.password.message}</Alert>
                )}
              </Box>

              {/* =================== Confirm Password ===================== */}

              <Box
                sx={{
                  mt: "1rem",
                }}
              >
                <InputLabel
                  sx={{
                    color: "var(--dark-blue-color)",
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  Confirm Password
                </InputLabel>
                <FormControl
                  fullWidth
                  sx={{
                    mt: ".3rem",
                    background: "#f5f6f8",
                  }}
                  variant="standard"
                >
                  <OutlinedInput
                    placeholder="Please type here ..."
                    type={showConfirmPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showConfirmPassword
                              ? "hide the confirm Password"
                              : "display the confirm Password"
                          }
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                </FormControl>
                {errors.confirmPassword && (
                  <Alert sx={{ marginBottom: "1rem" }} severity="error">
                    {errors.confirmPassword.message}
                  </Alert>
                )}
              </Box>

              {/* =================== submit btn ===================== */}

              <SubmitBtn isSubmitting={isSubmitting} title="Reset Password" />
            </form>
          </Container>
        </Grid>

        {/* Right Side: Image */}
        <RightSideImage
          text="Homes as unique as you."
          title="Reset to Roamhome"
          imgPath="/forgetBgsvg.svg"
        />
      </Grid>
    </>
  );
}
