import { Box } from "@mui/material";

export default function Logo() {
  return (
    <>
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
    </>
  );
}
