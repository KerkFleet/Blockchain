import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function NFTCard(props) {

  const handleClick = () => {
    console.log('https://opensea.io/collection/' + props.nftData['collection']['slug'])
    window.open('https://opensea.io/collection/' + props.nftData['collection']['slug']);
  }

  return (
    <Card sx={{ width: 300 }} >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={props.image_url}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
