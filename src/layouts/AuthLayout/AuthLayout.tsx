import { Outlet } from "react-router-dom";
import AuhtHeader from "../../templates/AuthTemplate/login/authHeader/AuhtHeader";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function AuthLayout() {
  return (
    <>
      <Grid container height={"100vh"}>
        {/* Left Side: Form */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
          }}
        >
          <Container maxWidth="sm">
            {/* Logo in Top-Left */}
            <Box
              sx={{
                position: {
                  xs: "static",
                  md: "absolute",
                },
                top: {
                  md: "3rem",
                },
                left: {
                  md: "3rem",
                },
                width: {
                  xs: "100%",
                  md: "auto",
                },
                textAlign: {
                  xs: "center",
                  md: "left",
                },
                fontSize: "26px",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#3252DF" }}>Stay</span>
              <span style={{ color: "#152C5B" }}>cation.</span>
            </Box>
            <AuhtHeader
              header={"Sign in"}
              linkName={"Register here!"}
              message={"If you don’t have an account register You can"}
              link={"./register"}
            />
            <Outlet />
          </Container>
        </Grid>

        {/* Right Side: Image */}
        <Grid size={{ xs: 0, md: 6 }} sx={{ padding: "1rem" }}>
          <Box
            sx={{
              backgroundImage: `url("/loginbg.svg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: { xs: "none", md: "flex" },
              position: "relative",
              height: "100%",
              borderRadius: "1rem",
              overflow: "hidden",
              alignItems: "flex-end",
              justifyContent: "start",
            }}
          >
            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(23, 33, 33, 0.3)",
                zIndex: 1,
              }}
            />

            {/* Text content above overlay */}
            <Box m={4} sx={{ position: "relative", zIndex: 2, color: "white" }}>
              <Typography variant="h4" fontWeight="bold">
                Sign in to Roamhome
              </Typography>
              <Typography mt={1}>Homes as unique as you.</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
