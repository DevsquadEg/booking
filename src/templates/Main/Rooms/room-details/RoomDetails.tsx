import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import RoomHeader from "../RoomHeader/RoomHeader";
import { BedOutlined, CalendarMonth } from "@mui/icons-material";
import { axiosInstance } from "@/services/axiosInstance";
import { PORTAL_URLS } from "@/services/apiEndpoints";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IRoom } from "@/interfaces/interfaces";

export default function RoomDetails() {
  const { id } = useParams<string>();

  const [rating, setRating] = useState<number | null>(4.5);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [room, setRoom] = useState<IRoom>();
  const fallbackImages = [
    "https://i.pinimg.com/736x/e6/30/db/e630db9e931df9ea09a6090cf5dbfa89.jpg",
    "https://i.pinimg.com/736x/11/0f/f5/110ff583b861e803f37bdf48380c0c4d.jpg",
    "https://i.pinimg.com/736x/3c/0f/1e/3c0f1e2b6d8a4b5d7f9a2c4b5c8f6b7d.jpg",
    "https://i.pinimg.com/736x/5c/0f/1e/5c0f1e2b6d8a4b5d7f9a2c4b5c8f6b7d.jpg",
    "https://i.pinimg.com/736x/7c/0f/1e/7c0f1e2b6d8a4b5d7f9a2c4b5c8f6b7d.jpg",
  ];

  async function getRoomDetails() {
    if (!id) {
      console.error("Room ID is not provided");
      return;
    }
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
              src={room?.images?.[0] || fallbackImages[0]}
              alt="Main Room"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />
          </Grid>

          {/* === Right Side: Additional Images === */}
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
                  src={room?.images?.[index] || fallbackImages[index - 1]}
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
            <Grid
              container
              spacing={2}
              mt={2}
              bgcolor={"#f5f5f5"}
              py={4}
              borderRadius={3}
            >
              {room?.facilities.map((facility, index) => (
                <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    gap={1}
                  >
                    {/* الأيقونة */}
                    <Box color="primary.main">
                      {facility.icon || <BedOutlined sx={{ fontSize: 40 }} />}
                    </Box>

                    {/* الاسم */}
                    <Typography
                      fontWeight="500"
                      color="#152C5B"
                      textTransform={"capitalize"}
                    >
                      {facility.name}
                    </Typography>
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

              {room?.discount && (
                <Typography color="error" mb={4} mt={1} fontSize={14}>
                  Discount {room?.discount || 0}% Off
                </Typography>
              )}

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
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    bgcolor: "var(--blue-color)",
                    px: 6,
                    py: 1.5,
                    mt: 2,
                    transition: "all 0.5s ease",
                    "&:hover": {
                      bgcolor: "#1a73e8",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  Continue Book
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* Rating and Comment Section */}
        
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          display={{ xs: "block", md: "flex" }}
          border={"1px solid #e0e0e0"}
          borderRadius={3}
          p={4}
          mt={4}
        >
          {/* Left Side: Rating & Message */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography mb={1}>Rate</Typography>
            <Rating
              name="rating"
              value={rating}
              precision={0.5}
              onChange={(_, value) => setRating(value)}
              sx={{ color: "#f4c150" }}
            />

            <Typography mt={3} mb={1}>
              Message
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={4}
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                "& fieldset": {
                  borderColor: "#ddd",
                },
                borderRadius: "10px",
              }}
            />

            <Button
              size="large"
              variant="contained"
              sx={{
                borderRadius: 1,
                textTransform: "none",
                bgcolor: "var(--blue-color)",
                px: 6,
                py: 1,
                mt: 2,
                transition: "all 0.5s ease",
                "&:hover": {
                  bgcolor: "#1a73e8",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              Rate
            </Button>
          </Grid>

          {/* Vertical Divider */}
          <Divider
            // orientation={{ xs: "horizontal", md: "vertical" }}
            orientation="vertical"
            sx={{ mt: { xs: 4, md: 0 } }}
            variant="middle"
            flexItem
          />

          {/* Right Side: Comment */}
          <Grid size={{ xs: 12, md: 5.5 }} sx={{ mt: { xs: 4, md: 0 } }}>
            <Typography mb={1}>Add Your Comment</Typography>
            <TextField
              fullWidth
              multiline
              minRows={6}
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                mt: 2,
                "& fieldset": {
                  borderColor: "#ddd",
                },
                borderRadius: "10px",
              }}
            />

            <Button
              size="large"
              variant="contained"
              sx={{
                borderRadius: 1,
                textTransform: "none",
                bgcolor: "var(--blue-color)",
                px: 6,
                py: 1,
                mt: 2,
                transition: "all 0.5s ease",
                "&:hover": {
                  bgcolor: "#1a73e8",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              Send
            </Button>
          </Grid>
        </Grid>

        
      </Container>
    </>
  );
}
