import { Box, Container, Grid, Typography } from "@mui/material";
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
        <Grid container spacing={4}>
          {/* // Room description and features */}
          <Grid>
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
                <Grid key={index}  xs={6} sm={4} md={3}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontSize={24}>{item.icon}</Typography>
                    <Typography>{item.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
