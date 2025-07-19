import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { light } from "node_modules/@mui/material/esm/styles/createPalette";

export default function RoomHeader({ roomName, city }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        mt: 4,
        mb: 3,
      }}
    >
      {/* Breadcrumbs */}
      <Box>
        <Breadcrumbs separator="/" aria-label="breadcrumb">
          <Link
            fontSize={18}
            color="#595c63ff"
            underline="hover"
            href="/"
            fontWeight={300}
          >
            Home
          </Link>
          <Typography fontSize={18} color="#152C5B" fontWeight={500}>
            Room Details
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Room Name and City */}
      <Box
        sx={{
          textAlign: "center",
          flex: 1,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          color="#11235A"
          sx={{ mb: 0.5 }}
        >
          Room Number {roomName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {city}
        </Typography>
      </Box>

      {/* Placeholder for additional content */}
      <Box sx={{ width: "170px" }}></Box>
    </Box>
  );
}
