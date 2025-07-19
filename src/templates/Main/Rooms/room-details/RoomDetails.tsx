import { Box, Button, Container, Grid, Typography } from "@mui/material";
import RoomHeader from "../RoomHeader/RoomHeader";
import { Bed, CalendarMonth } from "@mui/icons-material";
import { axiosInstance } from "@/services/axiosInstance";
import { PORTAL_URLS } from "@/services/apiEndpoints";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RoomDetails() {
  const { id } = useParams<string>();

  const [room, setRoom] = useState<string>();

  async function getRoomDetails() {
    try {
      const res = await axiosInstance.get(
        PORTAL_URLS.ROOMS.GET_ROOM_DETAILS(id)
      );
      setRoom(res.data.data.room);
      console.log("Room details:", res.data.data.room);
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  }

  useEffect(() => {
    getRoomDetails();
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <RoomHeader roomName={room?.roomNumber} />
        {/* Room details content goes here */}
        <Grid container spacing={2}>
          {/* الصورة الكبيرة */}
          <Grid size={{ xs: 12, md: 7.5 }}>
            <Box
              component="img"
              src={room?.images?.[0] || "/fallback.jpg"}
              alt="Main Room"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />
          </Grid>

          {/* الصورتين الجانبيتين */}
          <Grid size={{ xs: 12, md: 4.5 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                gap: 2,
              }}
            >
              {[1, 2].map((index) => (
                <Box
                  key={index}
                  component="img"
                  src={
                    room?.images?.[index] ||
                    "/public/photo-1497436072909-60f360e1d4b1.jpeg"
                  }
                  alt={`Room Image ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: "calc(50% - 4px)",
                    borderRadius: "16px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={6} mt={4}>
          {/* // Room description and features */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              fontSize={16}
              variant="body2"
              color="#b0b0b0"
              mb={1}
              fontWeight={300}
            >
              Minimal techno is a minimalist subgenre of techno music. It is
              characterized by a stripped-down aesthetic that exploits the use
              of repetition and understated development... Such trends saw the
              demise of the soul-infused techno that typified the original
              Detroit sound... Design is a plan or specification for the
              construction of an object or system or for the implementation...
            </Typography>

            {/* // Room features */}
            <Grid container spacing={2} mt={2}>
              {room?.facilities.map((item, index) => (
                <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <Typography fontSize={24}>
                      {item.icon || <Bed />}
                    </Typography>{" "}
                    <Typography>{item.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Side: Booking Box */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                p: 4,
                border: "1px solid #e5e5e5",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                color="var(--primary)"
                fontSize={20}
                fontWeight="500"
                mb={1}
              >
                Start Booking
              </Typography>

              <Typography
                variant="h4"
                color="#1abc9c"
                fontSize={36}
                fontWeight={600}
              >
                ${room?.price || 0}
                <Typography
                  mx={2}
                  fontSize={36}
                  component="span"
                  color="text.secondary"
                >
                  per night
                </Typography>
              </Typography>

              <Typography color="error" mb={4} mt={1} fontSize={14}>
                Discount 20% Off
              </Typography>

              {/* Pick a Date */}
              <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
                Pick a Date
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{
                  bgcolor: "#f5f5f5",
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                  mb: 2,
                }}
              >
                <CalendarMonth />
                <Typography>20 Jan - 22 Jan</Typography>
                {/* <Typography>
                  {dayjs(startDate).format("DD MMM")} -{" "}
                  {dayjs(endDate).format("DD MMM")}
                </Typography> */}
              </Box>

              <Typography color="text.secondary" mb={2}>
                You will pay <strong>$480 USD</strong> per 2 Person
              </Typography>

              <Box display={"flex"} justifyContent="center" my={2}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Continue Book
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
