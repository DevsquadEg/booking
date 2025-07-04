import { Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function AuhtHeader({ link, header, caption, NavLink }: any) {
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
        {caption}
        <MuiLink
          component={RouterLink}
          to={NavLink}
          sx={{
            ml: 1,
            fontWeight: "bold",
            textDecoration: "none",
            color: "red",
          }}
        >
          {link || "Register here !"}
        </MuiLink>
      </Typography>
    </>
  );
}
