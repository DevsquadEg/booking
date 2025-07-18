import { Box, Button, Container, Grid, Typography } from "@mui/material";
import RoomHeader from "../RoomHeader/RoomHeader";
import { CalendarMonth } from "@mui/icons-material";

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
        <Grid container spacing={4}>
          {/* // Room description and features */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="body2" color="text.secondary">
              Minimal techno is a minimalist subgenre of techno music. It is
              characterized by a stripped-down aesthetic that exploits the use
              of repetition and understated development...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Such trends saw the demise of the soul-infused techno that
              typified the original Detroit sound...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Design is a plan or specification for the construction of an
              object or system or for the implementation...
            </Typography>

            {/* // Room features */}
            <Grid container spacing={2} mt={2}>
              {[
                { icon: "🛏️", label: "5 bedroom" },
                { icon: "🛋️", label: "1 living room" },
                { icon: "🛁", label: "3 bathroom" },
                { icon: "🍽️", label: "1 dining room" },
                { icon: "📶", label: "10 mbp/s" },
                { icon: "🔧", label: "7 unit ready" },
                { icon: "🧊", label: "2 refrigerator" },
                { icon: "📺", label: "4 television" },
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
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                p: 3,
                border: "1px solid #eee",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Start Booking
              </Typography>

              <Typography variant="h4" fontWeight="bold" color="green">
                $280{" "}
                <Typography component="span" color="text.secondary">
                  per night
                </Typography>
              </Typography>

              <Typography color="error" mb={2}>
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
              </Box>

              <Typography color="text.secondary" mb={2}>
                You will pay <strong>$480 USD</strong> per 2 Person
              </Typography>

              <Button
                variant="contained"
                fullWidth
                sx={{ borderRadius: 2, textTransform: "none" }}
              >
                Continue Book
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
