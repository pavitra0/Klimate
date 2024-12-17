import {WeatherData} from "@/api/types"
import {Card, CardContent} from "../components/ui/card"
import {ArrowDown,ArrowUp,Droplets,Wind} from "lucide-react"

interface CurrentWeatherProps {
  data: WeatherData;
  locationName:string;
}

const CurrentWeather = ({data, locationName}: CurrentWeatherProps ) => {

  const {
    weather:[currentWeather],
    main:{temp,feels_like,temp_min,temp_max,humidity},
    wind:{speed},
  } = data

const formatTemp = (temp:number) => {
  return `${Math.round(temp)}°C`
}
  
return <div>
     <Card className="overflow-hidden">
     <CardContent className="p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
            <div className="space-y-2">
               <div className="flex items-center">
                  <h2 className="text-2xl font-bold tracking-tight">{locationName || "My Location"}</h2>
                 {//@ts-ignore
                 locationName.state && <span className="text-sm font-medium text-gray-400">, {locationName.state}</span> 
                 }
                 
               </div>
              <p className="text-sm text-muted-foreground">{//@ts-ignore
              locationName?.country}</p>
              
            </div>
            <div className="flex items-center gap-6">
              <p className="text-7xl font-bold tracking-tight mr-2">{formatTemp(temp)}</p>
            <div className=" space-y-1">
              <p className="text-sm font-bold text-gray-400">Feels Like {formatTemp(feels_like)}</p>
              <div className="flex gap-2 text-sm font-medium">
                <span className="flex items-center gap-1 text-blue-500">
              <ArrowDown className="h-3 w-3" />
                  {formatTemp(temp_min)}
                  
                </span>
                <span className="flex items-center gap-1 text-red-500">
              <ArrowUp className="h-3 w-3" />
                  {formatTemp(temp_max)}
                  
                </span>
              
              </div>
              
            </div>
            </div>
          
          <div className="grid grid-cols-2 gap-4" >
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div className="space-y-0.5">
              <p className="text-sm font-medium">Humidity</p>
                              <p className="text-sm text-muted-foreground">{humidity}%</p>
              </div>
            
            </div>

            <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-blue-500" />
              <div className="space-y-0.5">
              <p className="text-sm font-medium">Wind Speed</p>      
                <p className="text-sm text-muted-foreground">{speed} km/h</p>
              </div>
            </div>
            
          </div>
          
        </div>

        <div className="flex flex-col items-center justify-center">
        <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
        <img src={`https://openweathermap.org/img/wn/${currentWeather?.icon}@4x.png`} className="h-full w-full object-contain"/>
          <div className="absolute bottom-0 text-center">

            <p className="text-sm font-medium capitalize text-muted-foreground">
              {currentWeather?. description}
            </p>
          
          </div>
        </div>
        </div>
        
      </div>
     </CardContent>
     </Card>
</div>
  
}

export default CurrentWeather