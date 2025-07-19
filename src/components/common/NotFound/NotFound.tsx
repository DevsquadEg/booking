import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LostIllustration from "@/assets/404-illustration.svg";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          py: 10,
        }}
      >
        <Box
          sx={{
            maxWidth: "400px",
            width: "100%",
            animation: "fadeIn 0.8s ease-in-out",
          }}
        >
          <img
            src={LostIllustration}
            alt="404 illustration"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>

        {/* Content */}
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "4rem", sm: "6rem" },
              fontWeight: 700,
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
              mb: 2,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "text.primary",
            }}
          >
            Oops! Page not found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              maxWidth: "400px",
              color: "text.secondary",
            }}
          >
            The page you're looking for doesn't exist or has been moved. Maybe
            you mistyped the URL or it is no longer available.
          </Typography>

          <Box
            sx={{
              transition: "all 0.3s",
              "&:hover": { scale: 1.05 },
              "&:active": { scale: 0.95 },
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
                boxShadow: theme.shadows[4],
                "&:hover": {
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
