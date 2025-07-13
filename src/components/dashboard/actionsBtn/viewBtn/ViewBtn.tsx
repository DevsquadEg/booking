import { CircleOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

type Props = { handleOnClick: () => void };

export default function ViewBtn({ handleOnClick }: Props) {
  return (
    <Button
      sx={{
        mx: "auto",
        display: "flex",
        gap: "0.5rem",
        fontSize: "1rem",
        color: "var(--blue-color)",
        fontWeight: "normal",
      }}
      onClick={handleOnClick}
    >
      <Box
        sx={{
          position: "relative",
          padding: "0.5rem",
        }}
      >
        <CircleOutlined
          sx={{
            fontSize: "1.2rem",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <VisibilityOutlined
          sx={{
            fontSize: "0.7rem",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>
      <Typography sx={{ fontSize: "0.8rem" }}>View</Typography>
    </Button>
  );
}
