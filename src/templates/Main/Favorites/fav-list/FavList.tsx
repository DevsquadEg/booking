import { useEffect } from "react";
import {
  Box,
  Typography,
  Skeleton,
  Breadcrumbs,
  Link as MUILink,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ImageCard from "../../Home/ImageCard";
import { useFavorite } from "@/store/AuthContext/FavoriteContext";
import { ROOM_DETAILS_PATH } from "@/services/paths";

const FavoritesList = () => {
  const navigate = useNavigate();
  const {
    favList,
    favoriteIds,
    loading,
    getFavsList,
    addToFavs,
    deleteFromFavs,
    refreshFavorites,
  } = useFavorite();

  useEffect(() => {
    
    getFavsList();
  }, []);

  return (
    <Box px={{ xs: 2, sm: 4, md: 8, lg: 20 }} py={6}>
      {/* Page Heading */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#152C5B",
          mt: "20px",
          fontWeight: "bold",
        }}
      >
        Your Favorites
      </Typography>

      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ fontWeight: "500", mt: 2 }} aria-label="breadcrumb">
        <MUILink underline="none" color="#B0B0B0" component={RouterLink} to="/">
          Home
        </MUILink>
        <Typography sx={{ color: "#152C5B", fontWeight: "500" }}>
          Favorites
        </Typography>
      </Breadcrumbs>

      {/* Section Title */}
      <Box marginTop={5}>
        <Typography
          variant="h5"
          className="subTitle"
          sx={{ color: "#152C5B", fontWeight: "600" }}
        >
          Your Rooms
        </Typography>
      </Box>

      {/* Rooms List */}
      <Box mt={4}>
        {loading ? (
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            }}
          >
            {[...Array(4)].map((_, idx) => (
              <Skeleton
                key={idx}
                variant="rectangular"
                height={200}
                sx={{ borderRadius: 3 }}
              />
            ))}
          </Box>
        ) : favList.length === 0 ? (
          <Typography
            sx={{
              padding: "1rem",
              paddingTop: "2rem",
              fontSize: "32px",
              color: "text.primary",
              textAlign: "center",
            }}
          >
            No data available
          </Typography>
        ) : (
          <Box
            display="grid"
            gap={2}
            gridTemplateColumns={{
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            }}
          >
            {favList.map((room) => (
              <Box key={room._id}>
                <ImageCard
                  onClick={() => navigate(`${ROOM_DETAILS_PATH}/${room._id}`)}
                  roomId={room._id}
                  image={room.images?.[0]}
                  title={room.roomNumber}
                  price={room.price}
                  isFirst={false}
                  gridStyles={{ width: "100%", height: 250 }}
                  isFavorite={favoriteIds.includes(room._id)}
                  onToggleFavorite={(id) => {
                    if (favoriteIds.includes(id)) {
                      deleteFromFavs(id);
                    } else {
                      addToFavs(id);
                    }
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FavoritesList;
