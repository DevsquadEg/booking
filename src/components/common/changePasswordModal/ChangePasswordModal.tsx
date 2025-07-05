import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
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

  const {
    handleSubmit,
    reset,
    watch,
    register,
    getValues,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<PasswordFormData>();

  const handleFormSubmit = async (data: PasswordFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const response = await axiosInstance.put(
        ADMIN_URLS.USER.CHANGE_PASSWORD,
        data
      );
      console.log("response", response);
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

  const newPassword = watch("newPassword");

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

          <TextField
            fullWidth
            margin="normal"
            label="Current Password"
            type="password"
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
            {...register("oldPassword", {
              required: "Old Password is required",
            })}
          />

          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            {
              ...register(
                "newPassword",
                validation.PASSWORD_VALIDATION("New Password is required")
              )
              // {
              //   onChange: (e) => {
              //     if (isSubmitted) trigger("confirmPassword");
              //     register("newPassword").onChange({ target: e.target });
              //   },
              // }
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Confirm New Password"
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register(
              "confirmPassword",
              validation.CONFIRM_PASSWORD_VALIDATION(getValues, "newPassword")
            )}
          />
        </DialogContent>
        <DialogActions sx={{ alignItems: "center" }}>
          <Button onClick={onClose} disabled={isSubmitting}>
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
