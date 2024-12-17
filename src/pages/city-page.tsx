import {useParams,useSearchParams} from "react-router-dom";
import {useWeatherQuery,useForecastQuery} from "../hooks/use-weather";
import {Alert, AlertDescription,AlertTitle} from "../components/ui/alert";
import WeatherSkeleton from "../components/loading-skeleton";
import {AlertTriangle} from 'lucide-react'
import CurrentWeather from "../components/current-weather";

import WeatherDetails from "../components/weather-details";

import HourlyTemperature from "../components/hourly-temperature";

import WeatherForecast from "../components/weather-forecast";
import FavoriteButton from "../components/favorite-btn";
import FavoriteCities from '../components/favorite-cities';

const CityPage = () => {
  const [searchParams] = useSearchParams();
const params = useParams()
const latParam = searchParams.get('lat');
const lonParam = searchParams.get('lon');


const lat = parseFloat(latParam||``);
const lon = parseFloat(lonParam||``);

const coordinates = { lat, lon };
 const cityName = params.city; 

const weatherQuery = useWeatherQuery(coordinates)
const forecastQuery = useForecastQuery(coordinates)


  

              if (!latParam || !lonParam || isNaN(parseFloat(latParam)) || isNaN(parseFloat(lonParam))) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="w-6 h-6 text-red-500" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Invalid or missing latitude/longitude parameters in the URL.
      </AlertDescription>
    </Alert>
  );
  }
  

              
if(weatherQuery.error || forecastQuery.error){
  return(
    <Alert variant="destructive">
    <AlertTriangle className="w-6 h-6 text-red-500" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        Failed to load weather data 😞
      </AlertDescription>
    </Alert>
  )
  
}

  
if(!weatherQuery.data || !forecastQuery.data ){
  return <WeatherSkeleton />
}
  
  return(
     
   <div className="space-y-4">
     <FavoriteCities />
    <div className="flex items-center justify-between">
  <h1 className="text-xl font-bold tracking-tight">{cityName}, {weatherQuery.data.sys.country}</h1>
      <div>
        <FavoriteButton data={{...weatherQuery.data,name:`${cityName}`}} />
      </div>
    </div>

     <div className="grid gap-6">
       <div className="flex flex-col  gap-4">
         <CurrentWeather
           /*@ts-ignore*/ 
           data={weatherQuery.data} locationName={cityName} />
         <HourlyTemperature data={forecastQuery.data} />
       </div>

      <div className="flex flex-col gap-4">
        
      <WeatherDetails data={weatherQuery.data} />
        <WeatherForecast data={forecastQuery.data} />
      </div>
       
     </div> 
    
  </div>);
};
export default CityPage;
