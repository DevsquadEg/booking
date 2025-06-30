
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side: Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
        }}
      >

      </Grid>

      {/* Right Side: Image */}
      <Grid
        item
        md={6}
        sx={{
          backgroundImage: `url('/path/to/your/image.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" },
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: 40,
            color: "#fff",
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Sign in to Roamhome
          </Typography>
          <Typography variant="subtitle1">Homes as unique as you.</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
