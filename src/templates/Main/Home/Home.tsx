import { useEffect, useState } from "react";
import { Box, Typography, Link, Skeleton } from "@mui/material";
import { axiosInstance } from "@/services/axiosInstance";
import { PORTAL_URLS } from "@/services/apiEndpoints";
import ImageCard from "./ImageCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ReviewSection from "./ReviewSection ";
import toast from "react-hot-toast";
import { useFavorite } from "@/store/AuthContext/FavoriteContext";
import { useNavigate } from "react-router-dom";
import { ROOM_DETAILS_PATH } from "@/services/paths";
import HeaderHomeXplore from "@/components/common/HeaderHomeXplore/HeaderHomeXplore";
import { Link as MUILink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  images: string[];
}

interface Ad {
  _id: string;
  room: Room;
  createdBy: {
    _id: string;
    userName: string;
  };
}

const Home = () => {
  const navigate = useNavigate();

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [adsData, setAdsData] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshFavorites } = useFavorite();

  /* =============== get ads all  ========================== */

  const getAdsAll = async () => {
    try {
      const response = await axiosInstance.get(PORTAL_URLS.ADS.GET_ALL_ADS);
      const allAds = response.data.data.ads || [];
      const sortedRecentAds = allAds
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 20);
      setAdsData(sortedRecentAds || []);
      console.log(response);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };
  /* ========== get all favs to render the favlist comp ==========  */

  const getFavoriteRooms = async () => {
    try {
      const response = await axiosInstance.get(
        PORTAL_URLS.ROOMS.GET_FAVORITE_ROOMS
      );
      const rooms = response.data.data.favoriteRooms?.[0]?.rooms || [];
      const ids = rooms.map((room: Room) => room._id);
      setFavoriteIds(ids);
    } catch (error) {
      console.error("Failed to fetch favorites", error);
    }
  };
  /* ========== add to favs========== */

  const addToFavs = async (roomId: string) => {
    try {
      const response = await axiosInstance.post(
        PORTAL_URLS.ROOMS.ADD_TO_FAVORITES,
        { roomId }
      );
      setFavoriteIds((prev) => [...prev, roomId]); //  Update state
      toast.success(response?.data?.message || "Room added to favorites.");
      refreshFavorites();
      console.log(response);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to add to favorites."
      );
      console.error(error);
    }
  };
  /* ========== remove from favs========== */

  const deleteFromFavs = async (roomId: string) => {
    try {
      const response = await axiosInstance.delete(
        PORTAL_URLS.ROOMS.REMOVE_FROM_FAVORITES(roomId),
        {
          data: { roomId }, //  Send in body!
        }
      );

      setFavoriteIds((prev) => prev.filter((id) => id !== roomId)); // search by ID
      toast.success(response?.data?.message || "Room removed from favorites.");
      refreshFavorites();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to remove from favorites."
      );
      console.error(error);
    }
  };

  /* =============== skeleton loading  ========================== */

  const renderSkeletonGrid = () => (
    <Box
      display="grid"
      gap={2}
      gridTemplateColumns={{ xs: "1fr", md: "510px 1fr 1fr" }}
      gridTemplateRows={{ xs: "auto", md: "250px 250px" }}
    >
      {[...Array(6)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={250}
          sx={{ borderRadius: 2 }}
        />
      ))}
    </Box>
  );
  const renderSkeletonSlider = () => (
    <Box display="flex" justifyContent="center" gap={2}>
      {[...Array(4)].map((_, index) => (
        <Box key={index}>
          <Skeleton
            variant="rectangular"
            width={390}
            height={250}
            sx={{ borderRadius: 2, mb: 1 }}
          />
          <Skeleton variant="text" width={200} height={28} />
          <Skeleton variant="text" width={150} height={20} />
        </Box>
      ))}
    </Box>
  );

  useEffect(() => {
    getAdsAll();
    getFavoriteRooms();
  }, []);

  return (
    <Box px={{ xs: 2, sm: 4, md: 8, lg: 20 }} py={6}>
      <HeaderHomeXplore />
      {/* Most Popular Ads Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography color="#152C5B" variant="h5" fontWeight={600}>
          Most popular ads
        </Typography>
        <MUILink
          underline="none"
          sx={{ textDecoration: "none", color: "red", fontWeight: 500 }}
          component={RouterLink}
          to="/rooms"
        >
          more
        </MUILink>
      </Box>

      {loading ? (
        renderSkeletonGrid()
      ) : (
        <Box
          display="grid"
          gap={2}
          gridTemplateColumns={{ xs: "1fr", md: "510px 1fr 1fr" }}
          gridTemplateRows={{ xs: "auto", md: "250px 250px" }}
        >
          {adsData.slice(0, 5).map((ad, index) => {
            const room = ad.room;
            const isFirst = index === 0;
            const gridStyles =
              index === 0
                ? { gridColumn: "1 / 2", gridRow: "1 / 3" }
                : index === 1
                ? { gridColumn: "2 / 3", gridRow: "1 / 2" }
                : index === 2
                ? { gridColumn: "3 / 4", gridRow: "1 / 2" }
                : index === 3
                ? { gridColumn: "2 / 3", gridRow: "2 / 3" }
                : { gridColumn: "3 / 4", gridRow: "2 / 3" };

            return (
              <ImageCard
                onClick={() => navigate(`${ROOM_DETAILS_PATH}/${room._id}`)}
                key={room._id}
                roomId={room._id}
                image={room.images?.[0]}
                title={room.roomNumber}
                price={room.price}
                isFirst={isFirst}
                gridStyles={gridStyles}
                isFavorite={favoriteIds.includes(room._id)}
                onToggleFavorite={(id) => {
                  if (favoriteIds.includes(id)) {
                    // ou check if that roomId is already in favList or not
                    deleteFromFavs(id);
                  } else {
                    addToFavs(id);
                  }
                }}
              />
            );
          })}
        </Box>
      )}

      {/* Houses with Beauty Backyard Section */}
      <Box mt={8}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography color="#152C5B" variant="h5" fontWeight={600}>
            Houses with beauty backyard
          </Typography>
          <MUILink
            underline="none"
            sx={{ textDecoration: "none", color: "red", fontWeight: 500 }}
            component={RouterLink}
            to="/rooms"
          >
            more
          </MUILink>
        </Box>

        {loading ? (
          renderSkeletonSlider()
        ) : (
          <Swiper
            spaceBetween={16}
            slidesPerView={4}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
            modules={[Autoplay]}
            style={{ width: "100%" }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {adsData.map((ad) => {
              const room = ad.room;
              return (
                <SwiperSlide key={room._id}>
                  <ImageCard
                    roomId={room._id}
                    image={room.images?.[0]}
                    title={""}
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
                    onClick={() => navigate(`${ROOM_DETAILS_PATH}/${room._id}`)}
                  />
                  <Typography
                    color="#152C5B"
                    fontWeight={600}
                    fontSize={16}
                    mt={1}
                  >
                    {room.roomNumber}
                  </Typography>
                  <Typography variant="body2" color="#C7C7C7">
                    item location
                  </Typography>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Box>

      {/* Hotels with Large Living Room Section */}
      <Box mt={8}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography color="#152C5B" variant="h5" fontWeight={600}>
            Hotels with large living room
          </Typography>
          <MUILink
            underline="none"
            sx={{ textDecoration: "none", color: "red", fontWeight: 500 }}
            component={RouterLink}
            to="/rooms"
          >
            more
          </MUILink>
        </Box>

        {loading ? (
          renderSkeletonSlider()
        ) : (
          <Swiper
            spaceBetween={16}
            slidesPerView={4}
            autoplay={{ delay: 1500, disableOnInteraction: true }}
            modules={[Autoplay]}
            style={{ width: "100%" }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {adsData.map((ad) => {
              const room = ad.room;
              return (
                <SwiperSlide key={room._id}>
                  <ImageCard
                    roomId={room._id}
                    image={
                      room.images?.[0]?.replace(
                        "/upload/",
                        "/upload/q_auto,f_auto/"
                      ) || ""
                    }
                    title={""}
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
                  <Typography
                    color="#152C5B"
                    fontWeight={600}
                    fontSize={16}
                    mt={1}
                  >
                    {room.roomNumber}
                  </Typography>
                  <Typography variant="body2" color="#C7C7C7">
                    item location
                  </Typography>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Box>

      {/* Ads Section */}
      <Box mt={8}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography color="#152C5B" variant="h5" fontWeight={600}>
            Ads
          </Typography>
          <MUILink
            underline="none"
            sx={{ textDecoration: "none", color: "red", fontWeight: 500 }}
            component={RouterLink}
            to="/rooms"
          >
            more
          </MUILink>
        </Box>

        {loading ? (
          renderSkeletonSlider()
        ) : (
          <Swiper
            spaceBetween={16}
            slidesPerView={4}
            autoplay={{ delay: 1000, disableOnInteraction: true }}
            modules={[Autoplay]}
            style={{ width: "100%" }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {adsData.map((ad) => {
              const room = ad.room;
              return (
                <SwiperSlide key={room._id}>
                  <ImageCard
                    roomId={room._id}
                    image={
                      room.images?.[0]?.replace(
                        "/upload/",
                        "/upload/q_auto,f_auto/"
                      ) || ""
                    }
                    title={""}
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
                  <Typography
                    color="#152C5B"
                    fontWeight={600}
                    fontSize={16}
                    mt={1}
                  >
                    {room.roomNumber}
                  </Typography>
                  <Typography variant="body2" color="#C7C7C7">
                    item location
                  </Typography>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Box>
      {/* review  */}

      <ReviewSection />
    </Box>
  );
};

export default Home;
