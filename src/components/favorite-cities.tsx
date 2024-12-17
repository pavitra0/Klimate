import {useFavorite} from '../hooks/use-favorite'
import {ScrollArea,ScrollBar} from "./ui/scroll-area"
import {useWeatherQuery} from "../hooks/use-weather"
import {useNavigate} from "react-router-dom"
import {Button} from './ui/button'
import {X} from 'lucide-react'
import {toast} from 'sonner'
import {Loader2} from 'lucide-react'

interface FavoriteCityProps {
  id: string;
  name:string;
  lat:number;
  lon:number;
  onRemove: (id:string) => void;
}


const FavoriteCities = () =>{
const {favorites,removeFavorite}= useFavorite()

  if(!favorites?.length) return null

  
  return <>
  <h1 className="text-xl font-bold tracking-tight">Favorite Cities</h1>
    <ScrollArea className="w-full overflow-x-auto overflow-y-hidden pb-4">
      <div className="flex gap-4">
        {favorites.map((city) =>{
    return <FavoriteCity key={city.id} {...city} onRemove={() => removeFavorite.mutate(city.id)} />
        })}
      </div>
      <ScrollBar orientation="horizontal" className="mt-2" />
    </ScrollArea>
      
  </>
}

function FavoriteCity({id,name,lat,lon,onRemove}:FavoriteCityProps){
const navigate=useNavigate()
  const {data:weather,isLoading} = useWeatherQuery({lat,lon})

  
  return(
    <div 
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)} className="flex items-center relative min-w-[250px] cursor-pointer rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md gap-3">
  <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100" onClick={(e) => {
      e.stopPropagation();
      onRemove(id); 
      toast.error(`City ${name}  has been Removed`); 
  }}>
  <X className='h-4 w-4 font-bold'/>
  </Button>

      {isLoading ? (
        <div className="flex h-6 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ): weather ? (
        <>
          <div className="flex items-center gap-3">
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description} className="h-8 w-8 rounded-full"
            />

            <div>
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs text-muted-foreground">{weather.sys.country}</p>
        </div>
          <div className="ml-auto p-2 text-right">
          <p className="text-sm font-bold">{Math.round(weather.main.temp)}°C</p>
            <p className="text-xs text-muted-foreground capitalize">{weather.weather[0].description}</p>
          </div>
          </div>
        
        </>
      ) : null}
    </div>
  )
}


export default FavoriteCities