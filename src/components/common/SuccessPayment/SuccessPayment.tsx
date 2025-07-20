import { Box, Button, Grid } from "@mui/material";
import photo from "../../../assets/imgs/sc.png"
import { useNavigate } from "react-router-dom";
export default function SuccessPayment() {
    const navigate = useNavigate()
  return (
    <Box component={"section"} p={3}>
      <Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>
      <Grid size={{xs:12 , md:6}}>
        <Box width={"100%"} component={"img"} src={photo} alt="success"/>
      </Grid>
      <Grid size={{xs:12 , md:6}}>
        <Button onClick={()=>{navigate("/")}} variant="contained">Home</Button>
      </Grid>
      </Grid>
    </Box>
  )
}

