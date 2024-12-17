import { WeatherData} from '../api/types'
import {useFavorite} from "../hooks/use-favorite"
import {Star} from "lucide-react"
import {Button} from "./ui/button"
import {toast} from 'sonner'

interface FavoriteBtnProps{
  data:WeatherData,
}

const FavoriteBtn =   ({data}:FavoriteBtnProps)=>{
  const {addFavorite,removeFavorite,isFavorite} = useFavorite()

const isCurrentlyFavorite= isFavorite(data.coord.lat,data.coord.lon)

const handleToggleFavorite =() =>{
  
  if(isCurrentlyFavorite){
    removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`)
    toast.error(`Removed ${data.name} from your favorites`)
  }else{
    addFavorite.mutate({
      name:data.name,
      lat:data.coord.lat,
      lon:data.coord.lon,
      country:data.sys.country,
    })
    toast.success(`Added ${data.name} to your favorites`)
  }
}
  
  return <Button variant={isCurrentlyFavorite ? "default" :"outline"}
       className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : "text-gray-500"} 
           onClick={handleToggleFavorite}
           >
   <Star className={`h-5 w-5 ${isCurrentlyFavorite?"fill-current":""}`} />
  </Button>
}

export default FavoriteBtn