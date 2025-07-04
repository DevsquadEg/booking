import {
  Alert,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import AuhtHeader from "../login/authHeader/AuhtHeader";
import countries from "./CountryList";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance } from "../../../services/axiosInstance";
import { PORTAL_URLS } from "../../../services/apiEndpoints";
import type { IRegitserForm } from "../../../interfaces/interfaces";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SubmitBtn from "../../../layouts/AuthLayout/submitBtn";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

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
    let finalData = convertValuesInroForm(data);
    try {
      const response = await axiosInstance.post(
        PORTAL_URLS.USER.REGISTER,
        finalData
      );
      toast.success(response?.data?.message || "Successfully toasted!");

      // Here you would typically send the data to your backend
      console.log("Form submitted successfully:", response);

      navigate("/Login", { replace: true });

      // You can also handle success messages or navigation here
    } catch (error: string | any) {
      console.error("Error submitting form:", error);
      toast.error(error?.response?.data?.message || "This didn't work.");

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
          <AuhtHeader
            header={"Sign up !"}
            link={"Login here !"}
            caption={"If you already have an account register "}
            NavLink={"/Login"}
          />
          <form onSubmit={handleSubmit(onSubmitRegister)}>
            {/* =================== User Name ===================== */}

            <Typography>User Name</Typography>
            <TextField
              {...register("userName", { required: "User Name is required" })}
              fullWidth
              margin="normal"
              label="User Name"
              placeholder="Please type here ..."
              sx={{
                backgroundColor: "#F5F6F8",
                borderRadius: "9px", // adjust as needed
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  borderRadius: "9px",
                },
              }}
            />

            {errors.userName && (
              <Alert sx={{ marginBottom: "1rem" }} severity="error">
                {errors.userName.message}
              </Alert>
            )}

            {/* =================== Phone Number ===================== */}
            <Box display={"flex"} gap={2}>
              <Box display="flex" flexDirection="column" flex={1}>
                <Typography>Phone Number</Typography>

                <TextField
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                  fullWidth
                  margin="normal"
                  label="Phone Number"
                  placeholder="Please type here ..."
                  sx={{
                    backgroundColor: "#F5F6F8",
                    borderRadius: "9px", // adjust as needed
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                      borderRadius: "9px",
                    },
                  }}
                />
                {errors.phoneNumber && (
                  <Alert sx={{ marginBottom: "1rem" }} severity="error">
                    {errors.phoneNumber.message}
                  </Alert>
                )}
              </Box>
              {/* ===================Country ===================== */}
              <Box display="flex" flexDirection="column" flex={1}>
                <Typography>Country</Typography>
                <Box sx={{ backgroundColor: "#F5F6F8", marginTop: "1rem" }}>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Country is required" }}
                    render={({ field, fieldState }) => (
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
                            {...params}
                            label="Choose a country"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                backgroundColor: "#F5F6F8",
                                "& fieldset": {
                                  border: "none",
                                },
                              },
                              "& .MuiAutocomplete-inputRoot": {
                                borderRadius: "8px",
                              },
                            }}
                          />
                        )}
                      />
                    )}
                  />
                </Box>
                {errors.country && (
                  <Alert sx={{ marginTop: "0.5rem" }} severity="error">
                    {errors.country.message}
                  </Alert>
                )}
              </Box>{" "}
            </Box>
            {/* =================== Email Address ===================== */}

            <Typography sx={{ marginTop: "1rem" }}>Email Address</Typography>
            <TextField
              {...register("email", { required: "Email is required" })}
              fullWidth
              margin="normal"
              label="Email Address"
              placeholder="Please type here ..."
              sx={{
                backgroundColor: "#F5F6F8",
                borderRadius: "9px", // adjust as needed
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  borderRadius: "9px",
                },
              }}
            />
            {errors.email && (
              <Alert sx={{ marginBottom: "1rem" }} severity="error">
                {errors.email.message}
              </Alert>
            )}

            {/* =================== Password ===================== */}
            <Typography>Password</Typography>
            <TextField
              {...register("password", { required: "Password is required" })}
              fullWidth
              margin="normal"
              label="Password"
              placeholder="Please type here ..."
              type={showPassword ? "text" : "password"}
              sx={{
                backgroundColor: "#F5F6F8",
                borderRadius: "9px", // adjust as needed
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  borderRadius: "9px",
                },
              }}
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
            {errors.password && (
              <Alert sx={{ marginBottom: "1rem" }} severity="error">
                {errors.password.message}
              </Alert>
            )}

            {/* =================== Confirm Password ===================== */}
            <Typography>Confirm Password</Typography>
            <TextField
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              fullWidth
              margin="normal"
              label="Confirm Password"
              placeholder="Please type here ..."
              type={showPassword ? "text" : "password"}
              sx={{
                backgroundColor: "#F5F6F8",
                borderRadius: "9px", // adjust as needed
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  borderRadius: "9px",
                },
              }}
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
            {errors.confirmPassword && (
              <Alert sx={{ marginBottom: "1rem" }} severity="error">
                {errors.confirmPassword.message}
              </Alert>
            )}

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
              <Alert sx={{ marginBottom: "1rem" }} severity="error">
                {errors.profileImage.message}
              </Alert>
            )}

            {/* =================== submit btn ===================== */}

            <SubmitBtn isSubmitting={isSubmitting} title="Sign Up" />
          </form>
        </Container>
      </Grid>

      {/* right side */}
      <Grid size={{ xs: 0, md: 6 }} sx={{ padding: "1rem" }}>
        <Grid
          sx={{
            backgroundImage: `url("/Rectangle 7.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
            position: "relative",
            height: "100%",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
            "&::after": {
              content: '""',
              position: "absolute",
            },
          }}
        ></Grid>
      </Grid>
    </Grid>
  );
}
