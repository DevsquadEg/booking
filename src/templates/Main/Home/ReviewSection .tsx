import { Box, Typography, Rating, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import t1 from "/photo-1497436072909-60f360e1d4b1.jpeg";
import t2 from "/HD-wallpaper-beautiful-sea-view-nature.jpg";
import t3 from "/photo-1518623489648-a173ef7824f3.jpeg";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

const reviews = [
  { id: 1, img: t1 },
  { id: 2, img: t2 },
  { id: 3, img: t3 },
];

const ReviewSection = () => {
  return (
    <Box px={{ xs: 2, sm: 4, md: 8, lg: 20 }} py={12}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".next-arrow",
          prevEl: ".prev-arrow",
        }}
        loop
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
              gap={8}
            >
              {/* Image with shadow card */}
              <Box
                flex="2"
                position="relative"
                width={{ xs: "100%", md: "auto" }}
                maxWidth={{ xs: "100%", sm: 360, md: 400 }}
                mx="auto"
              >
                {/* Shadow card background */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: { xs: "100%", md: 400 },
                    borderRadius: "16px",
                    borderBottomRightRadius: "80px",
                    border: "4px solid #E5E5E5",
                    bgcolor: "#fff",
                    zIndex: 0,
                    boxShadow: "0px 8px 30px rgba(0,0,0,0.05)",
                  }}
                />
                {/* Main image */}
                <Box
                  component="img"
                  src={review.img}
                  alt="Reviewer"
                  sx={{
                    width: "100%",
                    height: { xs: "auto", md: 400 },
                    borderRadius: "16px",
                    borderBottomRightRadius: "80px",
                    objectFit: "cover",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Box>

              {/* Text Content */}
              <Box flex="2" width="100%">
                <Typography variant="h5" color="#152C5B" fontWeight={600} mb={5}>
                  Happy Family
                </Typography>
                <Rating value={4}  />
                <Typography
                  variant="body1"
                  my={2}
                  maxWidth={500}
                  color="#152C5B"
                  fontSize={"18px"}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, excepturi voluptatum voluptates voluptate vitae dignissimos sunt facilis esse molestiae nisi, aspernatur rem, praesentium saepe cupiditate ad repellendus voluptas reiciendis iure.
                </Typography>
                <Typography color="#C7C7C7" variant="subtitle2" fontWeight={500}>
                  Angga, Product Designer
                </Typography>

                {/* Arrows */}
                <Box display="flex" justifyContent="flex-start" mt={4} gap={1}>
                  <IconButton className="prev-arrow">
                    <ArrowCircleLeftOutlinedIcon fontSize="large" sx={{ color: "#203FC7", fontSize: "50px" }} />
                  </IconButton>
                  <IconButton className="next-arrow">
                    <ArrowCircleRightOutlinedIcon fontSize="large" sx={{ color: "#203FC7", fontSize: "50px" }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ReviewSection;
