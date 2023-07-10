import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader'
import moment from 'moment'

const weatherCard = ({weatherData} : {weatherData: any}) => (
    <Card sx={{ border: 1 }}>
      <CardHeader title={weatherData.name} />
      <CardContent>
        <p>Temperature: {weatherData.main.temp} &deg;F</p>
        <p>Min Temp: {weatherData.main.temp_min} &deg;F</p>
        <p>Max Temp: {weatherData.main.temp_max} &deg;F</p>
        <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
        <p>Description: {weatherData.weather[0].main}</p>
        <p>Day: {moment().format('dddd')}</p>
        <p>Date: {moment().format('LL')}</p>
      </CardContent>
    </Card>
)

export default weatherCard