import { Box, Button, CircularProgress } from "@mui/material";

const SubmitBtn = ({
  isSubmitting,
  title,
  className,
}: {
  isSubmitting: boolean;
  title: string;
  className?: string;
}) => {
  return (
    <Button
      type="submit"
      fullWidth
      size="large"
      variant="contained"
      sx={{ bgcolor: "#3252DF", borderRadius: "5px", marginTop: "10px" }}
    >
      {(isSubmitting && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress size="30px" />
        </Box>
      )) ||
        title}
    </Button>
  );
};

export default SubmitBtn;
