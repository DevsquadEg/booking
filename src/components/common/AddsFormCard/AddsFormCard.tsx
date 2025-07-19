import {
  Box,
  Button,
  Dialog,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import { Controller } from "react-hook-form";
import type {
  AddsRoom,
  CreateAddProps,
  CreateNewAddProps,
} from "@/interfaces/Adds.interface";
import { axiosInstance } from "@/services/axiosInstance";
import { ADMIN_URLS } from "@/services/apiEndpoints";

export default function AddsFormCard({
  open,
  onClose,
  title,
  handleCreateNewAdd,
  error,
  selectedAdd,
  handleUpdateCurrentAdd,
}: CreateNewAddProps) {
  const [rooms, setRooms] = useState<AddsRoom[] | []>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<CreateAddProps>({ mode: "onChange" });

  useEffect(() => {
    async function fetchRooms() {
      try {
        const { data } = await axiosInstance.get(
          ADMIN_URLS.ROOM.GET_ALL_ROOMS_FOR_ADDS
        );
        setRooms(data.data.rooms);
      } catch (error) {
        if (isAxiosError(error))
          toast.error(error.response?.data.message || " Some thing Go Wrong !");
      }
    }
    fetchRooms();
  }, []);

  useEffect(() => {
    if (selectedAdd) {
      reset({
        discount: selectedAdd.discount,
        isActive: selectedAdd.isActive ? "true" : "false",
        room: selectedAdd.roomId,
      });
    }
  }, [reset, selectedAdd]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ position: "relative", width: "100%" }}>
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": { bgcolor: "error.main", color: "#fff" },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography p={3} component={"h3"} variant="h4">
              {title}
            </Typography>

            <Box
              component={"form"}
              p={3}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit((data) => {
                if (!selectedAdd) handleCreateNewAdd(data);
                if (selectedAdd) handleUpdateCurrentAdd(data, selectedAdd._id);
              })}
            >
              {title === "Add New Ad" && (
                <Box mb={2}>
                  <Controller
                    name="room"
                    control={control}
                    rules={{ required: "Room Number is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        fullWidth
                        onChange={(e) => field.onChange(e.target.value)}
                        sx={{
                          width: "100%",
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Room Number
                        </MenuItem>
                        {rooms.map((room) => (
                          <MenuItem key={room._id} value={room._id}>
                            {room.roomNumber}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.room && (
                    <FormHelperText>{errors.room?.message}</FormHelperText>
                  )}
                </Box>
              )}

              <Box mb={2}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#f0f4f8",
                      },
                    },
                  }}
                  variant="outlined"
                  placeholder="Discound"
                  fullWidth
                  type="number"
                  {...register("discount", {
                    required: "Discount Is Required",
                    pattern: {
                      value: /^[1-9][0-9]?$/,
                      message:
                        "Discount Must Be More Than 0 and 1 or 2 Character",
                    },
                  })}
                />
                {errors.discount && (
                  <FormHelperText>{errors.discount.message}</FormHelperText>
                )}
              </Box>

              <Box mb={2}>
                <Controller
                  name="isActive"
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      fullWidth
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      sx={{
                        width: "100%",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Status
                      </MenuItem>
                      <MenuItem value="true">Active</MenuItem>
                      <MenuItem value="false">In Active</MenuItem>
                    </Select>
                  )}
                />
                {errors.isActive && (
                  <FormHelperText>{errors.isActive?.message}</FormHelperText>
                )}
              </Box>

              <Box>{error && <FormHelperText>{error}</FormHelperText>}</Box>

              <Box
                component={"footer"}
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  {title === "Update Ad" ? "Update" : "Save"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}
