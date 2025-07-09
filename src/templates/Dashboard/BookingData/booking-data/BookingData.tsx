import { ReceiptTemplate } from "@/components/dashboard/pritableComponent/ReceiptTemplate";
import { ADMIN_URLS } from "@/services/apiEndpoints";
import { axiosInstance } from "@/services/axiosInstance";
import type { BookingsType } from "@/services/types";
import { useReactToPrint } from "react-to-print";
import {
  AccessTime,
  CalendarMonth,
  CheckCircle,
  Hotel,
  NavigateBeforeOutlined,
  Paid,
  PendingActions,
  Person,
  Print,
  Share,
  Update,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { isAxiosError } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function BookingData() {
  const navigate = useNavigate();
  const data = useLocation();
  const [currentBooking, setCurrentBooking] = useState<BookingsType>(
    data.state?.booking
  );
  const { id } = useParams();
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const getBookingDetails = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        ADMIN_URLS.BOOKING.GET_BOOKING(id!)
      );
      setCurrentBooking(response.data.data.booking);
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
    if (!currentBooking || currentBooking?._id !== id) {
      getBookingDetails();
    }
  }, [getBookingDetails, currentBooking, id]);

  // printing receipt
  const receiptRef = useRef<HTMLDivElement>(null);

  // todo: replace with actual booking URL after deploy
  const bookingUrl = `https://website.com/bookings/${currentBooking._id}`;

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    onBeforePrint: () => {
      // Temporarily make the content visible before capturing
      if (receiptRef.current) {
        receiptRef.current.style.display = "block";
      }
      return Promise.resolve();
    },
    onAfterPrint: () => {
      if (receiptRef.current) {
        receiptRef.current.style.display = "none";
        receiptRef.current.style.position = "";
        receiptRef.current.style.left = "";
      }
    },
    pageStyle: `
        @page { size: auto; margin: 5mm; }
        @media print {
          body { -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
      `,
  });

  return (
    <>
      <Box>
        <IconButton aria-label="back" onClick={() => navigate(-1)}>
          <NavigateBeforeOutlined />
        </IconButton>
      </Box>
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h4" fontWeight="bold">
            Booking #{currentBooking._id.slice(-6).toUpperCase()}
          </Typography>
          <Chip
            label={currentBooking.status.toUpperCase()}
            color={
              currentBooking.status === "completed" ? "success" : "warning"
            }
            icon={
              currentBooking.status === "completed" ? (
                <CheckCircle fontSize="small" />
              ) : (
                <PendingActions fontSize="small" />
              )
            }
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          />
        </Stack>

        <Grid container spacing={3}>
          {/* Main Booking Card */}
          <Grid size={12}>
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                {/* Timeline Progress */}
                <Box mb={4}>
                  <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    Booking Timeline
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={currentBooking.status === "completed" ? 100 : 50}
                    sx={{ height: 8, borderRadius: 4 }}
                    color={
                      currentBooking.status === "completed"
                        ? "success"
                        : "warning"
                    }
                  />
                  <Stack direction="row" justifyContent="space-between" mt={1}>
                    <Typography variant="caption">Booked</Typography>
                    <Typography variant="caption">
                      {currentBooking.status === "completed"
                        ? "Completed"
                        : "In Progress"}
                    </Typography>
                  </Stack>
                </Box>

                <Grid container spacing={3}>
                  {/* Dates */}
                  <Grid size={12}>
                    <DetailCard
                      icon={<CalendarMonth color="primary" />}
                      title="Dates"
                      content={
                        <>
                          <Typography>
                            {new Date(
                              currentBooking.startDate
                            ).toLocaleDateString("en-US", dateOptions)}{" "}
                            -{" "}
                            {new Date(
                              currentBooking.endDate
                            ).toLocaleDateString("en-US", dateOptions)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            (
                            {`${
                              Math.ceil(
                                new Date(currentBooking.endDate).getTime() -
                                  new Date(currentBooking.startDate).getTime()
                              ) /
                              (1000 * 60 * 60 * 24)
                            } days`}
                            )
                          </Typography>
                        </>
                      }
                    />
                  </Grid>

                  {/* Room Info */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <DetailCard
                      icon={<Hotel color="primary" />}
                      title="Room"
                      content={
                        currentBooking.room ? (
                          <>
                            <Typography>
                              Room #{currentBooking.room.roomNumber}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ID: {currentBooking.room._id.slice(-6)}
                            </Typography>
                          </>
                        ) : (
                          <Typography color="text.secondary">
                            No room assigned
                          </Typography>
                        )
                      }
                    />
                  </Grid>

                  {/* User Info */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <DetailCard
                      icon={<Person color="primary" />}
                      title="Guest"
                      content={
                        <>
                          <Typography>
                            {currentBooking.user.userName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            User ID: {currentBooking.user._id.slice(-6)}
                          </Typography>
                        </>
                      }
                    />
                  </Grid>

                  {/* Payment Info */}
                  <Grid size={12}>
                    <DetailCard
                      icon={<Paid color="primary" />}
                      title="Payment"
                      content={
                        <>
                          <Typography variant="h6" fontWeight="bold">
                            ${currentBooking.totalPrice.toFixed(2)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total for{" "}
                            {`${
                              Math.ceil(
                                new Date(currentBooking.endDate).getTime() -
                                  new Date(currentBooking.startDate).getTime()
                              ) /
                              (1000 * 60 * 60 * 24)
                            } days`}
                          </Typography>
                        </>
                      }
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Meta Info */}
                <Stack direction="row" spacing={4}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AccessTime color="action" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Created:{" "}
                      {new Date(currentBooking.createdAt).toLocaleDateString(
                        "en-US",
                        dateOptions
                      )}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Update color="action" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Updated:{" "}
                      {new Date(currentBooking.updatedAt).toLocaleDateString(
                        "en-US",
                        dateOptions
                      )}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} mt={3}>
              <Button
                variant="outlined"
                startIcon={<Print />}
                onClick={handlePrint}
              >
                Print Receipt
              </Button>
              <Button variant="outlined" startIcon={<Share />}>
                Share
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box ref={receiptRef} sx={{ display: "none" }}>
        <ReceiptTemplate booking={currentBooking} qrValue={bookingUrl} />
      </Box>
    </>
  );
}

// Reusable Detail Card Component
const DetailCard = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) => (
  <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box sx={{ color: "primary.main" }}>{icon}</Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        {content}
      </Box>
    </Stack>
  </Paper>
);
