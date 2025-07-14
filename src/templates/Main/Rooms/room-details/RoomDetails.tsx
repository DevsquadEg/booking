import { Box, Container } from "@mui/material";
import RoomHeader from "../RoomHeader/RoomHeader";

export default function RoomDetails() {
  return (
    <>
      <Container maxWidth="lg">
        <RoomHeader roomName="Village Angga" city="New York / USA" />
        {/* Room details content goes here */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            my: 3,
            mt: 6,
          }}
        >
          <Box
            component="img"
            src={"/public/Rectangle1 5.svg"}
            sx={{
              width: { xs: "100%", md: "60%" },
              borderRadius: "16px",
              objectFit: "cover",
              height: "100%", // أو height ثابت لو حبيت
            }}
          />

          {/* Placeholder for additional images */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: { xs: "100%", md: "38%" },
              gap: 2,
            }}
          >
            <Box
              component="img"
              src={"/public/small2.svg"}
              alt="Room Image 1"
              sx={{
                width: "100%",
                height: "calc(50% - 4px)",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />
            <Box
              component="img"
              src={"/public/small3.svg"}
              alt="Room Image 2"
              sx={{
                width: "100%",
                height: "calc(50% - 4px)",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}
