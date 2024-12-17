import type {ForecastData} from "@/api/types";
import {format} from 'date-fns'
import {Card,CardContent,CardTitle,CardHeader} from './ui/card'
import {ArrowUp, ArrowDown,Droplets,Wind} from 'lucide-react'




interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecastProps {
  date:number;
  temp_min:number;
  temp_max:number;
  humidity:number;
  wind:number;
  weather:{
    id:number;
    main:string;
    description:string;
    icon:string;
  }
}

const WeatherForecast = ({data}:WeatherForecastProps) => {

  const formatTemp = (temp:number) => `${Math.round(temp)}°C`
  
  const dailyForecasts = data.list.reduce((acc,forecast) => {
    const date = format(new Date(forecast.dt * 1000),'dd MMM')

    if(!acc[date]){
      
      acc[date] = {
      
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        //@ts-ignore
        weather: forecast.weather[0],
        wind: forecast.wind.speed,
        date: forecast.dt * 1000,
      }
      
    }else{
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min)
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max)
    }
    return acc
  },{} as Record<string, DailyForecastProps>)

  const nextDays = Object.values(dailyForecasts).slice(0,6)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 font-bold">
          {nextDays.map((day) =>{
            return <div className="grid grid-cols-3 items-center gap-2 sm:gap-4 rounded-lg border p-4" key={day.date}>
              <div>
            <p className="text-[12px] sm:font-medium sm:text-lg">{format(new Date(day.date * 1000), "EEE, MMM d")}</p>
                <p className="text-[10px] sm:text-sm text-muted-foreground capitalize"> {day.weather.description}</p>
              </div>

              <div className="flex justify-start sm:justify-center gap-0.5 sm:gap-6 text-[12px] sm:text-lg">
                <span className="flex items-center text-blue-500 ">
                  <ArrowDown className="ml-1 h-4 w-4 sm:h-6 sm:w-6" />
                  {formatTemp(day.temp_min)}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className=" h-4 w-4 sm:h-6 sm:w-6 ml-1" />
                  {formatTemp(day.temp_max)}
                </span>
              </div>

              <div className="flex justify-end tracking-tighter sm:gap-4 gap-1">
                <span className="flex items-center gap-1 sm:gap-4">
                  <Droplets className="h-3.5 w-3.5 sm:w-6 sm:h-6 text-blue-500" />
                  <span className="text-[12px] sm:text-lg">{day.humidity}%</span>
                </span>
                <span className="flex items-center gap-1 sm:gap-4">
                  <Wind className="h-3.5 w-3.5 sm:w-6 sm:h-6 text-blue-500" />
                  <span className="text-[12px] sm:text-lg">{day.wind}m/s</span>
                </span>
              </div>
            </div>
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;