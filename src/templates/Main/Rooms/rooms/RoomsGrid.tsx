import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import useExploreRooms from "@/hooks/useExploreRoom.hook";
import Loading from "@/components/common/Loading/Loading";
import type { RoomExplore } from "@/interfaces/RoomContext.interface";
import RoomCard from "@/components/common/RoomCard/RoomCard";
import { Link as MUILink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function RoomsGrid() {
  const { getAllExploreRooms, exploreRoomsList } = useExploreRooms();

  const breadcrumbs = [
    <MUILink
      component={RouterLink}
      key={"1"}
      color="#B0B0B0"
      to="/"
      style={{ textDecoration: "none" }}
    >
      HOME
    </MUILink>,

    <Typography key="3" sx={{ color: "text.primary" }}>
      EXPLORE
    </Typography>,
  ];

  useEffect(() => {
    getAllExploreRooms();
  }, [getAllExploreRooms]);

  if (!exploreRoomsList)
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <CircularProgress
          size={80}
          thickness={5.5}
          sx={{ color: "#3252DF", mb: 2 }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#3252DF",
            letterSpacing: 1,
            fontFamily: "Segoe UI, Roboto, sans-serif",
          }}
        >
          Loading...
        </Typography>
      </Box>
    );

  return (
    <>
      <Box px={{ xs: 2, sm: 4, md: 8, lg: 20 }} py={6} component={"section"}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#152C5B",
            mt: "20px",
            fontWeight: "bold",
          }}
        >
          Explore ALL Rooms{" "}
        </Typography>

        {/* bread crumb */}
        <Stack spacing={2} mb={3}>
          <Breadcrumbs separator="/" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>

        <Grid container spacing={3} justifyContent={"center"}>
          {exploreRoomsList.length === 0 ? (
            <Typography component={"p"} textAlign={"center"}>
              No Rooms Available
            </Typography>
          ) : (
            exploreRoomsList.map((room: RoomExplore, index: number) => (
              <RoomCard key={room._id} room={room} index={index} />
            ))
          )}
        </Grid>
      </Box>
    </>
  );
}
