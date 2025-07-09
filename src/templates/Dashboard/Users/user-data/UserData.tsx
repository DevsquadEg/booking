import { useCallback, useEffect, useState } from "react";
import {
  CalendarToday,
  Email,
  NavigateBeforeOutlined,
  Phone,
  Public,
  Update,
  VerifiedUser,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { UserType } from "@/services/types";
import { axiosInstance } from "@/services/axiosInstance";
import { ADMIN_URLS } from "@/services/apiEndpoints";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export default function UserData() {
  const navigate = useNavigate();
  const data = useLocation();
  const [currentUser, setCurrentUser] = useState<UserType>(data.state?.user);
  const { id } = useParams();
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const getUserProfile = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        ADMIN_URLS.USER.GET_USER_PROFILE(id!)
      );
      setCurrentUser(response.data.data.user);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  }, [id]);
  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
  }, [navigate, id]);
  useEffect(() => {
    if (!currentUser || currentUser?._id !== id) {
      getUserProfile();
    }
  }, [getUserProfile, currentUser, id]);

  return (
    <>
      <Box>
        <IconButton aria-label="back" onClick={() => navigate(-1)}>
          <NavigateBeforeOutlined />
        </IconButton>
      </Box>
      <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
        <Card elevation={3} sx={{ borderRadius: 4 }}>
          {/* Header Section */}
          <Box
            sx={{
              bgcolor: "primary.main",
              height: 120,
              position: "relative",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          />

          {/* Profile Section */}
          <CardContent sx={{ position: "relative", mt: -8 }}>
            <Stack direction="row" spacing={2} alignItems="flex-end">
              <Avatar
                src={currentUser.profileImage}
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                  boxShadow: 3,
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h4" fontWeight="bold">
                    {currentUser.userName}
                  </Typography>
                  {currentUser.verified && (
                    <Chip
                      icon={<VerifiedUser fontSize="small" />}
                      label="Verified"
                      color="success"
                      size="small"
                    />
                  )}
                  <Chip
                    label={currentUser.role.toUpperCase()}
                    color={
                      currentUser.role === "admin" ? "secondary" : "default"
                    }
                    sx={{ textTransform: "uppercase" }}
                  />
                </Stack>

                <Typography color="text.secondary" mt={1}>
                  Member since{" "}
                  {new Date(currentUser.createdAt).toLocaleString(
                    "en-US",
                    dateOptions
                  )}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Details Grid */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <DetailItem
                  icon={<Email color="primary" />}
                  label="Email"
                  value={currentUser.email}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <DetailItem
                  icon={<Phone color="primary" />}
                  label="Phone"
                  value={`0${currentUser.phoneNumber}`}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <DetailItem
                  icon={<Public color="primary" />}
                  label="Country"
                  value={currentUser.country}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <DetailItem
                  icon={<CalendarToday color="primary" />}
                  label="Joined"
                  value={new Date(currentUser.createdAt).toLocaleString(
                    "en-US",
                    dateOptions
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <DetailItem
                  icon={<Update color="primary" />}
                  label="Last Updated"
                  value={new Date(currentUser.updatedAt).toLocaleString(
                    "en-US",
                    dateOptions
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Stats Section (Optional) */}
        <Grid container spacing={3} mt={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard title="Bookings" value="24" color="#4e79a7" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard title="Reviews" value="16" color="#e15759" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard title="Favorites" value="8" color="#59a14f" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

// Reusable Detail Component
const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Stack direction="row" spacing={2} alignItems="center">
    {icon}
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight="medium">{value}</Typography>
    </Box>
  </Stack>
);

// Reusable Stat Card Component
const StatCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) => (
  <Card elevation={2} sx={{ p: 2, borderRadius: 3 }}>
    <Typography variant="body2" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h4" fontWeight="bold" sx={{ color }}>
      {value}
    </Typography>
  </Card>
);
