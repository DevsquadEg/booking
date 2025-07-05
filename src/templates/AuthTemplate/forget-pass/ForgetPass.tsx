import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import forgetBg from "../../../assets/imgs/forget-password.png";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import type { ForgetProps } from "../../../interfaces/interfaces";
import { baseURL } from "../../../services/apiEndpoints";
import validation from "../../../services/validation";

// mui imports
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Grid from "@mui/material/Grid";

import { Alert, Container, OutlinedInput } from "@mui/material";
import Logo from "../../../components/AuthComponents/Logo/Logo";
import AuhtHeader from "../../../components/AuthComponents/authHeader/AuhtHeader";
import SubmitBtn from "../../../layouts/AuthLayout/submitBtn";
import RightSideImage from "../../../components/AuthComponents/rightSideImage/RightSideImage";

export default function ForgetPass() {
  const [helperText, setHelperText] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ForgetProps>({ mode: "onChange" });

  // forget

  const handleForgetPassword = useCallback(
    async function (userInfo: ForgetProps) {
      const toastId = toast.loading("Waiting....");

      try {
        const options = {
          method: "POST",
          url: `${baseURL}/portal/users/forgot-password`,
          data: userInfo,
        };

        const { data } = await axios.request(options);
        if (data.success) {
          toast.success("Password Reset OTP Sent to Your Email");
          setTimeout(() => {
            navigate("/reset-pass", { state: { userEmail: watch("email") } });
          }, 1500);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message || " Some thing go Wrong !");
          setHelperText(
            error.response?.data.message || " Some thing go Wrong !"
          );
        }
      } finally {
        toast.dismiss(toastId);
      }
    },
    [navigate, watch]
  );

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
              header={"Forget Password"}
              message={"If you already have an account register "}
              linkName={"Login here!"}
              link={"/login"}
            />
            <form onSubmit={handleSubmit(handleForgetPassword)}>
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

              {/* =================== submit btn ===================== */}

              <SubmitBtn isSubmitting={isSubmitting} title="Send OTP" />
            </form>
          </Container>
        </Grid>

        {/* Right Side: Image */}
        <RightSideImage
          text="Homes as unique as you."
          title="Forget to Roamhome"
          imgPath="/forgetBgsvg.svg"
        />
      </Grid>
    </>
  );
}
