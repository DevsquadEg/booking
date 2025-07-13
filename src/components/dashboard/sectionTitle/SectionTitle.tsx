import { Box, Typography } from "@mui/material";

export default function SectionTitle({ title }: { title: string }) {
  return (
    <>
      <Box marginY={"1rem"}>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Typography component="p">you can check all details</Typography>
      </Box>
    </>
  );
}
