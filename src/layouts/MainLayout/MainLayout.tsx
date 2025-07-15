import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Box px={2}>
        <Outlet />
      </Box>
    </>
  );
}
