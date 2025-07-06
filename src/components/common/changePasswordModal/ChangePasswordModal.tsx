import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  useForm,
  type FieldErrors,
  type UseFormRegister,
  type UseFormTrigger,
} from "react-hook-form";
import SubmitBtn from "../../../layouts/AuthLayout/submitBtn";
import validation from "../../../services/validation";
import { axiosInstance } from "../../../services/axiosInstance";
import { ADMIN_URLS } from "../../../services/apiEndpoints";
import toast from "react-hot-toast";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

interface PasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  onClose,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    reset,
    // watch,
    register,
    getValues,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<PasswordFormData>();

  const handleFormSubmit = async (data: PasswordFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const response = await axiosInstance.post(
        ADMIN_URLS.USER.CHANGE_PASSWORD,
        data
      );
      toast.success(response.data.message || "Password changed successfully");
      // toast.success("Password changed successfully");
      reset();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to change password");
      setError(
        err instanceof Error ? err.message : "Failed to change password"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // const newPassword = watch("newPassword");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Change Password</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          {error && <Typography color="error">{error}</Typography>}
          <PasswordInput
            label="Current Password"
            register={register}
            errors={errors}
            registeredTitle="oldPassword"
            validation={validation.PASSWORD_VALIDATION(
              "Current Password is required"
            )}
            handleTogglePassword={handleTogglePassword}
            showPassword={showPassword}
          />
          <PasswordInput
            label="New Password"
            register={register}
            errors={errors}
            registeredTitle="newPassword"
            validation={validation.PASSWORD_VALIDATION(
              "New Password is required"
            )}
            handleTogglePassword={handleTogglePassword}
            showPassword={showPassword}
            isSubmitted={isSubmitted}
            trigger={trigger}
            triggeredInput={"confirmPassword"}
          />
          <PasswordInput
            label="Confirm Password"
            register={register}
            errors={errors}
            registeredTitle="confirmPassword"
            validation={validation.CONFIRM_PASSWORD_VALIDATION(
              getValues,
              "newPassword"
            )}
            handleTogglePassword={handleTogglePassword}
            showPassword={showPassword}
          />
        </DialogContent>
        <DialogActions sx={{ alignItems: "center" }}>
          <Button
            onClick={onClose}
            disabled={isSubmitting}
            sx={{ borderRadius: "5px", marginTop: "2rem" }}
          >
            Cancel
          </Button>
          <SubmitBtn
            isSubmitting={isSubmitting}
            title="Change Password"
            smallWidth
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};

const PasswordInput = ({
  label,
  register,
  registeredTitle,
  validation,
  errors,
  handleTogglePassword,
  showPassword,
  isSubmitted,
  trigger,
  triggeredInput,
}: {
  label: string;
  register: UseFormRegister<PasswordFormData>;
  registeredTitle: "oldPassword" | "newPassword" | "confirmPassword";
  validation: object & {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validate?: (value: string) => string;
  };
  errors: FieldErrors<PasswordFormData>;
  handleTogglePassword: () => void;
  showPassword: boolean;
  isSubmitted?: boolean;
  trigger?: UseFormTrigger<PasswordFormData>;
  triggeredInput?: "oldPassword" | "newPassword" | "confirmPassword";
}) => {
  return (
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
        {label}
      </InputLabel>
      <FormControl
        fullWidth
        sx={{
          mt: ".3rem",
        }}
        variant="standard"
      >
        <OutlinedInput
          sx={{
            background: "#f5f6f8",
          }}
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
          {...register(registeredTitle, {
            ...validation,

            onChange: (e) => {
              if (validation?.onChange) {
                validation.onChange(e);
              }

              if (trigger && isSubmitted && triggeredInput)
                trigger(triggeredInput);
            },
          })}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          //   if (trigger && triggeredInput && isSubmitted) {
          //     trigger(triggeredInput);
          //   }
          //   register(registeredTitle).onChange(e);
          // }}
        />
      </FormControl>
      {errors[registeredTitle] && (
        <Alert sx={{ marginBottom: "1rem" }} severity="error">
          {errors[registeredTitle].message}
        </Alert>
      )}
    </Box>
  );
};
