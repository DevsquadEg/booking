import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { FormProvider, useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FacilityType, RoomFormInputs } from "@/services/types";
import { ROOMS_LIST_PATH } from "../../../../services/paths";
import { axiosInstance } from "../../../../services/axiosInstance";
import { ADMIN_URLS } from "../../../../services/apiEndpoints";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import FacilitiesAutocomplete from "./FacilitiesAutocomplete";

export default function RoomData() {
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const methods = useForm<RoomFormInputs>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = methods;
  const file = watch("imgs");
  const [imageUrl, setImageUrl] = useState<string | null>(null); // display in edit action

  {
    /* ===================convert url to file ===================== */
  }

  const urlToFile = async (
    url: string,
    filename: string,
    mimeType: string
  ): Promise<File> => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  };

  {
    /* ===================convert data before fetch ===================== */
  }

  const convertValuesIntoForm = (data: RoomFormInputs) => {
    const formData = new FormData();
    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price);
    formData.append("capacity", data.capacity);
    formData.append("discount", data.discount);
    if (data.facilities && Array.isArray(data.facilities)) {
      data.facilities.forEach((facilityId) => {
        formData.append("facilities[]", facilityId); // this sends facilities[] = id1, id2, ...
      });
    }
    if (data.imgs) {
      formData.append("imgs", data.imgs);
    } else if (data.oldImage) {
      // ✅ Send old image URL back to the server if no new image uploaded
      formData.append("oldImage", data.oldImage);
    }

    return formData;
  };

  // =========== fetch room data if id exists ==========
  const fetchRoom = useCallback(async () => {
    if (!id) {
      toast.error("Room ID is missing");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get(ADMIN_URLS.ROOM.GET_ROOM(id));
      console.log("fetch", response.data.data.room);
      const { images } = response.data.data.room;

      const { roomNumber, price, capacity, discount, facilities } =
        response.data.data.room;

      reset({
        roomNumber: String(roomNumber),
        price: String(price),
        capacity: String(capacity),
        discount: String(discount),
        facilities: facilities.map((f: FacilityType) => f._id),
        oldImage: images?.[0] || "", // ✅ store old image
        imgs: null, // default placeholder
      });
      setImageUrl(images?.[0] || null); // Store the image URL separately

      if (images?.[0]) {
        const imageUrl = images[0];
        const fileName = imageUrl.split("/").pop() || "image.png";
        const file = await urlToFile(imageUrl, fileName, "image/png");
        setValue("imgs", file);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error?.response?.data?.message || "Failed to load room data"
        );
      }
    } finally {
      setLoading(false);
    }
  }, [id, reset, setValue]);

  {
    /* =================== onSubmit function ===================== */
  }

  const onSubmitRooms = async (data: RoomFormInputs) => {
    const formData = convertValuesIntoForm(data);
    try {
      if (id) {
        //update room
        const response = await axiosInstance.put(
          ADMIN_URLS.ROOM.UPDATE_ROOM(id),
          formData
        );
        console.log(response);
        toast.success("Room updated successfully");
        navigate(-1);
      } else {
        //  create room
        const response = await axiosInstance.post(
          ADMIN_URLS.ROOM.CREATE_ROOM,
          formData
        );
        console.log("Form submitted successfully", response);
        toast.success("Room created successfully");
        navigate(-1);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong!");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(
    () => {
      if (id) {
        fetchRoom(); // Fetch project data if editing
      } else {
        reset(); // Reset form for new project
      }
    },
    [fetchRoom, id, reset] // Run effect when id changes or on initial render
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingX: "20px",
          paddingY: "20px",
          backgroundColor: "#f5f5f5",
          marginBottom: "20px",
        }}
      >
        <Box
          onClick={() => navigate(-1)}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <ChevronLeftIcon fontSize="small" />
          <Typography variant="body2" sx={{ paddingLeft: "2px" }}>
            View All Rooms{" "}
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ marginBottom: "10px" }}>
          {id ? "Edit Room" : "Add a New Room"}
        </Typography>
      </Box>

      {/* =================== Form Container ===================== */}
      <Box
        sx={{
          p: 6,
          boxShadow: 5,
          width: "70%",
          marginX: "auto",
          borderRadius: "12px",
          marginTop: "20px",
          marginBottom: "120px",
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitRooms)}>
            <Box
              maxWidth="md"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                marginX: "auto",
              }}
            >
              {/* =================== Room Number ===================== */}

              <InputLabel
                sx={{
                  color: "var(--dark-blue-color)",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                Room Number
              </InputLabel>
              <FormControl
                fullWidth
                sx={{
                  margin: { top: ".3rem", bottom: "35px" },
                  backgroundColor: "#F5F6F8",
                }}
                variant="standard"
              >
                {(loading && (
                  <Skeleton variant="rectangular" sx={{ height: "60px" }} />
                )) || (
                  <OutlinedInput
                    placeholder="Please type here ..."
                    type={"text"}
                    {...register("roomNumber", {
                      required: "room Number is required",
                    })}
                  />
                )}
              </FormControl>
              {errors.roomNumber && (
                <FormHelperText error sx={{ fontSize: 13 }}>
                  {errors.roomNumber.message}
                </FormHelperText>
              )}

              <Box display={"flex"} gap={2} sx={{ mt: "1rem" }}>
                {/* =================== Room Price ===================== */}
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <InputLabel
                    sx={{
                      color: "var(--dark-blue-color)",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    Price
                  </InputLabel>
                  <FormControl
                    fullWidth
                    sx={{
                      margin: { top: ".3rem", bottom: "35px" },
                      backgroundColor: "#F5F6F8",
                    }}
                    variant="standard"
                  >
                    {(loading && (
                      <Skeleton variant="rectangular" sx={{ height: "60px" }} />
                    )) || (
                      <OutlinedInput
                        placeholder="Please type here ..."
                        type={"number"}
                        {...register("price", {
                          required: "price is required",
                        })}
                      />
                    )}
                  </FormControl>
                  {errors.price && (
                    <FormHelperText error sx={{ fontSize: 13 }}>
                      {errors.price.message}
                    </FormHelperText>
                  )}
                </Box>
                {/* =================== Room Capacity ===================== */}
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <InputLabel
                    sx={{
                      color: "var(--dark-blue-color)",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    capacity
                  </InputLabel>
                  <FormControl
                    fullWidth
                    sx={{
                      margin: { top: ".3rem", bottom: "35px" },
                      backgroundColor: "#F5F6F8",
                    }}
                    variant="standard"
                  >
                    {(loading && (
                      <Skeleton variant="rectangular" sx={{ height: "60px" }} />
                    )) || (
                      <OutlinedInput
                        placeholder="Please type here ..."
                        type={"number"}
                        {...register("capacity", {
                          required: "capacity is required",
                        })}
                      />
                    )}
                  </FormControl>
                  {errors.capacity && (
                    <FormHelperText error sx={{ fontSize: 13 }}>
                      {errors.capacity.message}
                    </FormHelperText>
                  )}
                </Box>
              </Box>
              <Box display={"flex"} gap={2} sx={{ mt: "1rem" }}>
                {/* =================== Room Discount ===================== */}
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <InputLabel
                    sx={{
                      color: "var(--dark-blue-color)",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    discount
                  </InputLabel>
                  <FormControl
                    fullWidth
                    sx={{
                      margin: { top: ".3rem", bottom: "35px" },
                      backgroundColor: "#F5F6F8",
                    }}
                    variant="standard"
                  >
                    {(loading && (
                      <Skeleton variant="rectangular" sx={{ height: "60px" }} />
                    )) || (
                      <OutlinedInput
                        placeholder="Please type here ..."
                        type={"number"}
                        {...register("discount", {
                          required: "discount is required",
                        })}
                      />
                    )}
                  </FormControl>
                  {errors.discount && (
                    <FormHelperText error sx={{ fontSize: 13 }}>
                      {errors.discount.message}
                    </FormHelperText>
                  )}
                </Box>
                {/* =================== Room facilities ===================== */}
                <Box display={"flex"} flexDirection={"column"} flex={1}>
                  <InputLabel
                    sx={{
                      color: "var(--dark-blue-color)",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    facilities
                  </InputLabel>
                  {(loading && (
                    <Skeleton
                      variant="rectangular"
                      sx={{ mt: "0.25rem", height: "60px" }}
                    />
                  )) || <FacilitiesAutocomplete />}
                </Box>
              </Box>
              {/* =================== Room Image ===================== */}
              <Box
                sx={{
                  marginTop: "1rem",
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
                <CloudUploadIcon
                  sx={{ fontSize: 40, color: "#1976d2", mb: 1 }}
                />
                <Typography variant="body1" color="textSecondary">
                  Browse File to Upload
                </Typography>
                <TextField
                  {...register("imgs", {
                    onChange(e) {
                      const selectedFile = e.target.files[0];
                      setValue("imgs", selectedFile);
                      setImageUrl(null); // Clear old image if new uploaded
                    },
                  })}
                  inputRef={fileInputRef}
                  type="file"
                  sx={{ display: "none" }}
                />
              </Box>

              {/* Display file name & delete button if file is uploaded */}
              {file instanceof File ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    border: "1px solid #e0e0e0",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    backgroundColor: "#fff",
                    mt: 1,
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
                    onClick={() => setValue("imgs", null)}
                    aria-label="delete"
                  >
                    <DeleteIcon color="error" fontSize="small" />
                  </IconButton>
                </Box>
              ) : imageUrl ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    border: "1px solid #e0e0e0",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    backgroundColor: "#fff",
                    mt: 1,
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
                    {imageUrl.split("/").pop()} {/* Show just the file name */}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setImageUrl(null)} // remove preview
                    aria-label="delete"
                  >
                    <DeleteIcon color="error" fontSize="small" />
                  </IconButton>
                </Box>
              ) : null}
            </Box>
            <Box
              sx={{
                borderTop: "1px solid #ccc",
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
                mx: "120px",
              }}
            >
              {/* =================== Cancel btn ===================== */}

              <Button
                className="mui-cancel-btn"
                onClick={() => navigate(ROOMS_LIST_PATH)}
                sx={{
                  color: "#3252DF",
                  borderColor: "#3252DF",
                  mr: "10px",
                  borderRadius: "5px",
                  marginTop: "2rem",
                  p: "10px 30px",
                }}
                variant="outlined"
              >
                Cancel
              </Button>

              {/* =================== submit btn ===================== */}

              <Button
                type="submit"
                sx={{
                  bgcolor: "#3252DF",
                  borderRadius: "5px",
                  marginTop: "2rem",
                  p: "10px 50px",
                }}
                disabled={isSubmitting}
                variant="contained"
              >
                {isSubmitting ? (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress size="30px" />
                  </Box>
                ) : id ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </>
  );
}
