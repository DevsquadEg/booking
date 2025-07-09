import QRCodeSVG from "qrcode.react";
import { Box, Typography, Divider, Grid, Stack } from "@mui/material";
import type { BookingsType } from "@/services/types";

type Props = {
  booking: BookingsType;
  qrValue: string;
};
export const ReceiptTemplate = ({ booking, qrValue }: Props) => (
  <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      Booking Receipt
    </Typography>
    <Divider sx={{ mb: 3 }} />

    <Grid container spacing={3}>
      {/* Left Column - Booking Info */}
      <Grid size={8}>
        <Stack spacing={2}>
          <Typography variant="subtitle1">
            <strong>Booking ID:</strong> {booking._id.slice(-8).toUpperCase()}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Status:</strong> {booking.status.toUpperCase()}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Dates:</strong>{" "}
            {new Date(booking.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(booking.endDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Room:</strong> {booking.room?.roomNumber || "Not assigned"}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Total:</strong> ${booking.totalPrice.toFixed(2)}
          </Typography>
        </Stack>
      </Grid>

      {/* Right Column - QR Code */}
      <Grid size={4} sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ bgcolor: "white", p: 1, borderRadius: 1 }}>
          <QRCodeSVG
            value={qrValue}
            size={128}
            level="H" // Error correction level
          />
          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            mt={1}
          >
            Scan for booking details
          </Typography>
        </Box>
      </Grid>
    </Grid>

    <Divider sx={{ my: 3 }} />

    {/* Footer */}
    <Typography variant="body2" color="text.secondary">
      Printed on{" "}
      {new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Thank you for choosing our service!
    </Typography>
  </Box>
);
