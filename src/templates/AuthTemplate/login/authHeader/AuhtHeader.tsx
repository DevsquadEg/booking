import React from "react";
import { Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function AuhtHeader({ link, header }: any) {
  return (
    <>
      <Typography
        sx={{
          fontWeight: "600",
          lineHeight: "normal",
        }}
        color="black"
        fontSize={"30px"}
        variant="h4"
        fontWeight={700}
        gutterBottom
      >
        {header}
      </Typography>

      <Typography
        variant="body2"
        mb={2}
        sx={{
          color: "#152C5B",

          fontSize: "16px",
        }}
      >
        If you don't have an account register
        <MuiLink
          component={RouterLink}
          to="/register"
          sx={{
            ml: 1,
            fontWeight: "bold",
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          {link || "Register here !"}
        </MuiLink>
      </Typography>
    </>
  );
}
