import { ADMIN_URLS } from "@/services/apiEndpoints";
import { axiosInstance } from "@/services/axiosInstance";
import type { Dashboard_Charts } from "@/services/types";
import {
  CampaignTwoTone,
  HotelTwoTone,
  StyleTwoTone,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  PieChart,
  BarChart,
  ChartsLegend,
  ChartsTooltip,
  ChartsAxis,
} from "@mui/x-charts";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const placeholderData = {
  rooms: 13,
  facilities: 145,
  bookings: {
    pending: 37,
    completed: 7,
  },
  ads: 7,
  users: {
    user: 634,
    admin: 225,
  },
};

export default function Dashboard() {
  const [data, setdata] = useState<Dashboard_Charts>(placeholderData);
  const [loading, setloading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        ADMIN_URLS.DASHBOARD.GET_SUMMARY
      );
      setdata(response.data.data);
      setloading(false);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const theme = useTheme();

  // Data transformations
  const bookingsSeries = [
    {
      data: [data.bookings.pending, data.bookings.completed],
      label: "Bookings",
    },
  ];

  const usersSeries = [
    {
      data: [
        { id: "users", value: data.users.user, label: "Regular Users" },
        { id: "admins", value: data.users.admin, label: "Administrators" },
      ],
      innerRadius: 60,
      outerRadius: 90,
    },
  ];

  // Color scheme
  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];
  return (
    <>
      <Box
        sx={{
          my: 2,
          borderRadius: 3,
          p: { xs: 2, md: 4 },
          backgroundColor: theme.palette.background.default,
          minHeight: "90vh",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Key metrics and performance indicators
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard
              title="Total Rooms"
              value={data.rooms}
              color={colors[0]}
              loading={loading}
              icon={<HotelTwoTone fontSize="large" />}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard
              title="Facilities"
              value={data.facilities}
              color={colors[1]}
              loading={loading}
              icon={<StyleTwoTone fontSize="large" />}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard
              title="Active Ads"
              value={data.ads}
              color={colors[2]}
              loading={loading}
              icon={<CampaignTwoTone fontSize="large" />}
            />
          </Grid>
        </Grid>

        {/* Main Charts Section */}

        {/* Secondary Charts Row */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }} sx={{ mb: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                borderRadius: 4,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                User Distribution
              </Typography>
              <Divider sx={{ mb: 3 }} />
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={300}
                  sx={{ mb: 2 }}
                />
              ) : (
                <>
                  <Box sx={{ height: 300 }}>
                    <PieChart
                      series={usersSeries}
                      colors={[colors[1], colors[4]]}
                    >
                      <ChartsTooltip />
                    </PieChart>
                  </Box>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={4}
                    mt={2}
                  >
                    <LegendItem
                      color={colors[1]}
                      label={`Users (${data.users.user})`}
                    />
                    <LegendItem
                      color={colors[4]}
                      label={`Admins (${data.users.admin})`}
                    />
                  </Stack>
                </>
              )}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 4,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Bookings Analysis
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ height: 400 }}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                  />
                ) : (
                  <BarChart
                    series={bookingsSeries}
                    xAxis={[
                      {
                        scaleType: "band",
                        data: ["Pending", "Completed"],
                        label: "Booking Status",
                      },
                    ]}
                    yAxis={[{ label: "Number of Bookings" }]}
                    colors={[colors[0], colors[3]]}
                    grid={{ vertical: true }}
                  >
                    <ChartsAxis />
                    <ChartsTooltip />
                    <ChartsLegend />
                  </BarChart>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

// Reusable Stat Card Component
const StatCard = ({
  title,
  value,
  color,
  icon,
  loading,
}: {
  title?: string;
  value?: number;
  color?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}) => (
  <Card
    sx={{
      height: "100%",
      borderRadius: 3,
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
      },
    }}
  >
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: `${color}10`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color, // This will style the two-tone icon
          }}
        >
          {/* circle Placeholder for the icon */}
          {loading ? (
            <Skeleton
              variant="circular"
              sx={{ width: "100%", height: "100%" }}
            />
          ) : (
            icon
          )}
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {loading ? <Skeleton width={100} /> : title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" color={color}>
            {loading ? <Skeleton width={100} /> : value}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

// Reusable Legend Item
const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Box
      sx={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        bgcolor: color,
      }}
    />
    <Typography variant="body2">{label}</Typography>
  </Stack>
);
