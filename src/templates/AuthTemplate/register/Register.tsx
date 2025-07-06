import {
  Alert,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import countries from "./CountryList";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useRef, useState } from "react";
import {
  Visibility,
  VisibilityOff,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance } from "../../../services/axiosInstance";
import { PORTAL_URLS } from "../../../services/apiEndpoints";

// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../../../layouts/AuthLayout/submitBtn";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AuhtHeader from "../../../components/AuthComponents/authHeader/AuhtHeader";
import RightSideImage from "../../../components/AuthComponents/rightSideImage/RightSideImage";
import Logo from "../../../components/AuthComponents/Logo/Logo";
import { LOGIN_PATH } from "../../../services/paths";
import { isAxiosError } from "axios";
import type { IRegitserForm } from "../../../interfaces/interfaces";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    control,
    watch,
    trigger,
  } = useForm<IRegitserForm>({ mode: "onChange" });
  const file = watch("profileImage"); // Assuming you're using react-hook-form's `watch`

  const convertValuesInroForm = (data: IRegitserForm) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("country", data.country.label);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("role", "user");
    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }

    return formData;
  };

  // Function to handle form submission
  const onSubmitRegister = async (data: IRegitserForm) => {
    const finalData = convertValuesInroForm(data);
    try {
      const response = await axiosInstance.post(
        PORTAL_URLS.USER.REGISTER,
        finalData
      );
      toast.success(response?.data?.message || "Successfully toasted!");

      // Here you would typically send the data to your backend
      console.log("Form submitted successfully:", response);

      navigate(LOGIN_PATH, { replace: true });

      // You can also handle success messages or navigation here
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Error submitting form:", error);

        toast.error(error?.response?.data?.message || "This didn't work.");
      }

      // Handle error messages here
    }
  };

  useEffect(() => {
    if (watch("confirmPassword")) {
      trigger("confirmPassword"); // This will trigger validation for confirmNewPassword whenever it changes
    }
  }, [watch, trigger]);

  return (
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
            header={"Sign Up!"}
            message={"If you already have an account register "}
            linkName={"Login here!"}
            link={LOGIN_PATH}
          />
          <form onSubmit={handleSubmit(onSubmitRegister)}>
            {/* =================== User Name ===================== */}

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
                User Name
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
                  // placeholder="Email"
                  {...register("userName", {
                    required: "User Name is required",
                  })}
                />
              </FormControl>
              {errors.userName && (
                <Alert
                  sx={{ marginBottom: "1rem", p: "0 20px" }}
                  severity="error"
                >
                  {errors.userName.message}
                </Alert>
              )}
            </Box>

            {/* =================== Phone Number ===================== */}
            <Box
              display={"flex"}
              gap={2}
              sx={{
                mt: "1rem",
              }}
            >
              <Box display="flex" flexDirection="column" flex={1}>
                <InputLabel
                  sx={{
                    color: "var(--dark-blue-color)",
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  Phone Number
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
                    type={"number"}
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                    })}
                  />
                </FormControl>
                {errors.phoneNumber && (
                  <Alert
                    sx={{ marginBottom: "1rem", p: "0 20px" }}
                    severity="error"
                  >
                    {errors.phoneNumber.message}
                  </Alert>
                )}
              </Box>

              {/* =================== Country ===================== */}
              <Box display="flex" flexDirection="column" flex={1}>
                <InputLabel
                  sx={{
                    color: "var(--dark-blue-color)",
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  Country
                </InputLabel>

                <Box
                  mt={".3rem"}
                  borderRadius={"5px"}
                  sx={{
                    // margin: { top: ".3rem", bottom: "35px" },
                    backgroundColor: "#F5F6F8",
                  }}
                >
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Country is required" }}
                    render={({ field }) => (
                      <Autocomplete
                        options={countries}
                        autoHighlight
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) =>
                          option.code === value?.code
                        }
                        onChange={(_, value) => field.onChange(value)}
                        value={field.value ?? null}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              alt=""
                            />
                            {option.label} ({option.code}) +{option.phone}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            variant="outlined"
                            {...params}
                            placeholder="Choose a country"
                            // sx={{
                            //   "& .MuiOutlinedInput-root": {
                            //     borderRadius: "8px",
                            //     backgroundColor: "#F5F6F8",
                            //     "& fieldset": {
                            //       border: "none",
                            //     },
                            //   },
                            //   "& .MuiAutocomplete-inputRoot": {
                            //     borderRadius: "8px",
                            //   },
                            // }}
                          />
                        )}
                      />
                    )}
                  />
                </Box>
                {errors.country && (
                  <Alert
                    sx={{ marginBottom: "1rem", p: "0 20px" }}
                    severity="error"
                  >
                    {errors.country.message}
                  </Alert>
                )}
              </Box>
            </Box>
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
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </FormControl>
              {errors.email && (
                <Alert
                  sx={{ marginBottom: "1rem", p: "0 20px" }}
                  severity="error"
                >
                  {errors.email.message}
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
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </FormControl>
              {errors.password && (
                <Alert
                  sx={{ marginBottom: "1rem", p: "0 20px" }}
                  severity="error"
                >
                  {errors.password.message}
                </Alert>
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
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the confirm Password"
                            : "display the confirm Password"
                        }
                        onClick={handleTogglePassword}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...register("confirmPassword", {
                    required: "confirmPassword is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
              </FormControl>
              {errors.confirmPassword && (
                <Alert
                  sx={{ marginBottom: "1rem", p: "0 20px" }}
                  severity="error"
                >
                  {errors.confirmPassword.message}
                </Alert>
              )}
            </Box>
            {/* =================== Profile Image ===================== */}

            <Box
              sx={{
                marginBlock: "1rem",
                border: "2px dashed #1976d2",
                borderRadius: "8px",
                padding: "2rem",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#F9FAFB",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <CloudUploadIcon sx={{ fontSize: 40, color: "#1976d2", mb: 1 }} />
              <Typography variant="body1" color="textSecondary">
                Browse File to Upload
              </Typography>
              <TextField
                {...register("profileImage", {
                  onChange(e) {
                    const selectedFile = e.target.files[0];
                    setValue("profileImage", selectedFile);
                  },
                })}
                inputRef={fileInputRef}
                type="file"
                sx={{ display: "none" }}
              />
            </Box>

            {/* Display file name & delete button if file is uploaded */}
            {file instanceof File && (
              <Box
                mt={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  border: "1px solid #e0e0e0",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  backgroundColor: "#fff",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: "80%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {file.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setValue("profileImage", null)}
                  aria-label="delete"
                >
                  <DeleteIcon color="error" fontSize="small" />
                </IconButton>
              </Box>
            )}

            {errors.profileImage && (
              <Alert
                sx={{ marginBottom: "1rem", p: "0 20px" }}
                severity="error"
              >
                {errors.profileImage.message}
              </Alert>
            )}

            {/* =================== submit btn ===================== */}

            <SubmitBtn isSubmitting={isSubmitting} title="Sign Up" />
          </form>
        </Container>
      </Grid>

      {/* Right Side: Image */}
      <RightSideImage
        text="Homes as unique as you."
        title="Sign up to Roamhome"
        imgPath="/signupBg.svg"
      />
    </Grid>
  );
}
