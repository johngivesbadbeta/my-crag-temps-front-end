import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Contact = () => {
  return (
    <div
      className='m-10 flex justify-center'
      >
      <Card sx={{ maxWidth: 345, border: 1 }}>
        <CardMedia
          sx={{ width: 345, height: 140 }}
          image="/images/crag_temps_pic.jpg"
          title="my picture"
        />
        <CardContent style={{ backgroundColor: '#a6d4fa'}}>
          <Typography gutterBottom variant="h5" component="div">
            About
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome to Crag Temps! My name is John Piñano and I have been rock
            climbing for more than 10 years now. I created Crag Temps to help my
            fellow climbers better plan their climbing trips by providing the weather
            forecast for their favorite areas! If you have any questions please
            contact me.
          </Typography>
        </CardContent>
        <CardActions style={{ backgroundColor: '#a6d4fa'}}>
          <Button href="mailto:jpinano@gmail.com" size="small">Email</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default Contact