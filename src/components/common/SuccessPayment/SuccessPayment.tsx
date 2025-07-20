import { Box, Button, Grid } from "@mui/material";
import photo from "../../../assets/success.svg";
import { useNavigate } from "react-router-dom";
export default function SuccessPayment() {
  const navigate = useNavigate();
  return (
    <Box component={"section"} p={3} textAlign={"center"}>
      <Grid
        container
        spacing={2}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Box component={"img"} src={photo} alt="success" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="contained"
            sx={{
              borderRadius: 1,
              textTransform: "none",
              bgcolor: "var(--blue-color)",
              px: 6,
              py: 1.5,
              mt: 3,
              transition: "all 0.5s ease",
              "&:hover": {
                bgcolor: "#1a73e8",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Home
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
