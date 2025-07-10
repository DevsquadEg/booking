import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import delet from "../../../assets/imgs/delete.png"
import { Avatar, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { DeletModelProps } from '@/interfaces/DeletModal.interface';

export default function DeleteModal({ onClose , currentData ,open , message , loading,onDelete }:DeletModelProps) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));





  return (
    <div>
   
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
            🗑️ Delete Confirmation Message

        </DialogTitle>
        <DialogContent>


               <Box component={"div"} display={"flex"} justifyContent={"center"} mb={2}> 
            <Avatar sx={{height:100 , width:100}} src={delet}/>
               </Box>
 
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} variant='contained' autoFocus onClick={onClose}>
            Cancel
          </Button>


   <Button loading={loading} variant="contained" color='warning' startIcon={<DeleteIcon />} onClick={()=>{onDelete(currentData._id)}} autoFocus>
        Delete
      </Button>

        </DialogActions>
      </Dialog>






    </div>
  )
}
