import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
 const   {width, text1, text2, btn1, btn2, textvariant} = props
  return (
    <Card sx={{ maxWidth: props.width }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.text1}
        </Typography>
        <Typography variant={props.textvariant} color="text.secondary">
          {props.text2}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{props.btn1}</Button>
        <Button size="small">{props.btn2}</Button>
      </CardActions>
    </Card>
  );
}
