import * as React from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CollectionsItem = (props) => {
  const handleClick = () => {
    console.log(props.num)
    props.handleRemove(props.num)
  }
  return(
      <ListItem
        secondaryAction={ !props.empty &&
          <IconButton edge="end" aria-label="delete" onClick={handleClick}>
            <DeleteIcon />
          </IconButton>
        }
      >
          <ListItemText
            primary={props.data['collections'][props.num]}
          />
      </ListItem>
  )
}

export default function BasicModal(props) {

  const [open, setOpen] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [data, setData] = React.useState({ "collections":[] });

  const handleOpen = () => {
      if(props.data['collections'].length === 0){
          const temp = { "collections" : ["No collections yet :("]};
          setData(temp);
          setEmpty(true);
      }
      else{
          setEmpty(false);
          setData(props.data);
      }
      console.log(data)
      setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const handleAdd = () => {
      props.addCollection(props.collection);
      props.showCollections();
      handleOpen();
  }

  const handleRemove = (index) => {
      props.removeCollection(index);
      props.showCollections();
  }

  return (
    <div>
      <Button onClick={handleOpen}>Update Collections</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Collections:
          </Typography>
            <Grid>
              {Array.from(Array(data['collections'].length)).map((_, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <CollectionsItem empty={empty} num={index} handleRemove={handleRemove} data={props.data}/>
                </Grid>
              ))}
            </Grid>
             <Stack spacing={2} direction="row">
                <TextField 
                  id="outlined-basic" 
                  label="collection-slug" 
                  variant="outlined" 
                  onChange={e=>props.setCollection(e.target.value)}/>
                <Button type="submit" variant="outlined" onClick={handleAdd}>Add</Button>
            </Stack>
        </Box>
      </Modal>
    </div>
  );
}
