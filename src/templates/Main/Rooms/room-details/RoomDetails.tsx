import { Box, Button, Container, Grid, Typography } from "@mui/material";
import RoomHeader from "../RoomHeader/RoomHeader";
import { CalendarMonth } from "@mui/icons-material";
import { axiosInstance } from "@/services/axiosInstance";
import { PORTAL_URLS } from "@/services/apiEndpoints";
import { useEffect, useState } from "react";

export default function RoomDetails() {
  const [roomId, setRoomId] = useState<string>("68775283ccc448ef859fed51");

  async function getRoomDetails() {
    try {
      const res = await axiosInstance.get(
        PORTAL_URLS.ROOMS.GET_ROOM_DETAILS(roomId)
      );
      setRoomId(res.data.data.room); // ✅ حطينا room في state
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
        <RoomHeader roomName="Village Angga" city="New York / USA" />
        {/* Room details content goes here */}
        <Grid spacing={2} size={{ xs: 12 }} container>
          <Box
            component="img"
            src={"/public/Rectangle1 5.svg"}
            sx={{
              width: { xs: "100%", md: "60%" },
              borderRadius: "16px",
              objectFit: "cover",
              height: "100%",
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
             
              {[
                { icon: "🛏️", label: ` bedroom` },
                { icon: "🛋️", label: `living room` },
                { icon: "🛁", label: `bathroom` },
                { icon: "🍽️", label: ` dining room` },
                { icon: "📶", label: ` mbp/s` },
                { icon: "🔧", label: `unit ready` },
                { icon: "🧊", label: ` refrigerator` },
                { icon: "📺", label: ` television` },
              ].map((item, index) => (
                <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontSize={24}>{item.icon}</Typography>
                    <Typography>{item.label}</Typography>
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
                $280
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
                <Typography>
                  {dayjs(startDate).format("DD MMM")} -{" "}
                  {dayjs(endDate).format("DD MMM")}
                </Typography>
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
