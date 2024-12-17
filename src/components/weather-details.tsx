import {format} from "date-fns"
import type { WeatherData } from '../api/types';
import {Sunrise,Sunset,Compass,Gauge} from "lucide-react"
import {Card,CardTitle,CardContent,CardHeader} from "./ui/card"

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails= ({ data }:WeatherDetailsProps ) => {

const {//@ts-ignore
  main, weather, wind, sys, name, timezone, dt } = data

const formatTime = (time: number) =>{
  return format(new Date(time * 1000), 'h:mm a')
}

const getWindDirection = (deg: number)=>{
  const direction = ["N","NE","E","SE","SW","S","W","NW"]

  const index = Math.round(((deg%=360)<0?deg+360:deg)/45)%8;

  return direction[index]
}
  
const details =[
  {
    title:'Sunrise',
    value: formatTime(sys.sunrise),
    icon: Sunrise,
    color: 'text-orange-500'
  },
  {
    title:'Sunset',
    value: formatTime(sys.sunset),
    icon: Sunset,
    color: 'text-blue-500'
  },
  {
    title:'Wind Direction',
    value: `${getWindDirection(wind.deg)} (${wind.deg})°`,
    icon: Compass,
    color: 'text-green-500'
  },
  {
    title:'Pressure',
    value: `${main.pressure} hPa`,
    icon: Gauge,
    color: 'text-purple-500'
  },
  
  
  
]
  

  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <detail.icon className={`h-5 w-5 ${detail.color} ${detail.icon==Compass ? "animate-spine":""}`} />
              <div>
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
      
  
  );
};

export default WeatherDetails;