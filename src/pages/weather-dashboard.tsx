import { useState, useEffect } from "react";


import {
  Button
} from "../components/ui/button"
import {
AlertDescription,
  AlertTitle,
  Alert
} from "../components/ui/alert"

import CurrentWeather from "../components/current-weather"
import HourlyTemperature from "../components/hourly-temperature"
import WeatherDetails from "../components/weather-details"
import WeatherForecast from "../components/weather-forecast"

import {
  AlertTriangle,
  MapPin,
  RefreshCw

} from "lucide-react"

import {useReverseGeocodeQuery, useForecastQuery,useWeatherQuery} from "../hooks/use-weather"

import {useGeolocation} from "../hooks/use-geolocation"

import WeatherSkeleton from '../components/loading-skeleton'


const WeatherDashBoard = () => {
const [loadingTimeout, setLoadingTimeout] = useState(false);

 //@ts-ignore 
const {coordinates,error:locationError,isLoading:locationLoading,getLocation} = useGeolocation();

const locationQuery = useReverseGeocodeQuery(coordinates);
const weatherQuery = useWeatherQuery(coordinates);
const forecastQuery = useForecastQuery(coordinates);

console.log("Hello user👋")
  
  const handleRefresh = () => {
    setLoadingTimeout(false)
    getLocation();
    if(coordinates){
     weatherQuery.refetch();
     forecastQuery.refetch();
      locationQuery.refetch();
    }
  }

  
  useEffect(() => {
    //@ts-ignore
    let timeout;
    if (locationLoading) {
      timeout = setTimeout(() => setLoadingTimeout(true), 10000);
    } else {
      setLoadingTimeout(false); 
    }
    //@ts-ignore
    return () => clearTimeout(timeout);
  }, [locationLoading]);
  

  if(locationError){
    return  <Alert variant="destructive" className="supports-[backdrop-filter]:bg-background/60">
    <AlertTriangle className="w-5 h-5 mr-2" />
      <AlertTitle className="font-bold">Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Failed to get location, please Allow the Location.</p>
        <Button onClick={getLocation} variant="outline" className="w-fit">
        <MapPin className="w-5 h-5 mr-2" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
  }

if (loadingTimeout) {
    return (
      <Alert variant="destructive" className="supports-[backdrop-filter]:bg-background/60">
        <AlertTriangle className="w-5 h-5 mr-4" />
        <AlertTitle className="font-bold">Loading Timeout</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          Unable to fetch your location. Please try again later.
        </AlertDescription>
        <Button onClick={handleRefresh} variant="outline" className="w-fit">
          <RefreshCw className="w-5 h-5 mr-4" />
          Retry
        </Button>
      </Alert>
    );
}
  
  if(locationLoading){
    return <WeatherSkeleton />
  }


  
  if(!coordinates){
    return  <Alert
        className="supports-[backdrop-filter]:bg-background/60"      
              >
    <AlertTriangle className="w-5 h-5 mr-2" />
      <AlertTitle className="font-bold">Location Required.</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>please enable location access to see your local weather.
      </p>
        <Button onClick={getLocation} variant="outline" className="w-fit">
        <MapPin className="w-5 h-5 mr-2" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
  }

const locationName = locationQuery.data || forecastQuery.data?.city?.name || weatherQuery.data?.name || "Unknown Location";


  
  if(weatherQuery?.error || forecastQuery?.error){
    return  <Alert  className="supports-[backdrop-filter]:bg-background/60" variant="destructive">
    <AlertTriangle className="w-5 h-5 mr-2" />
      <AlertTitle className="font-bold">Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Failed to fetch weather data retry again.</p>
        <Button onClick={handleRefresh} variant="outline" className="w-fit">
        <RefreshCw className="w-5 h-5 mr-2" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  }

  if (!weatherQuery?.data || !forecastQuery?.data) {
    
    return <WeatherSkeleton />;
  }

   return(
     
   <div className="space-y-4">
    
    <div className="flex items-center justify-between">
  <h1 className="text-xl font-bold tracking-tight">{`${locationName}`||"My location"},   {weatherQuery.data.sys.country}</h1>
    <Button variant={'outline'} size="icon" 
   onClick={handleRefresh}
   disabled={weatherQuery.isFetching || forecastQuery.isFetching}   
      >
    <RefreshCw className={`h-4 w-4 sm:h-6 sm:w-6 ${weatherQuery.isFetching?"animate-spin":""}`}/>
      
    </Button> 
    </div>

     {
       
       
       locationName && <div className="grid gap-6">
       <div className="flex flex-col  gap-4">
         
         <CurrentWeather data={weatherQuery.data} /*@ts-ignore */
  locationName={locationName} />
         <HourlyTemperature data={forecastQuery.data} />
       </div>

      <div className="flex flex-col gap-4">
        
      <WeatherDetails data={weatherQuery.data} />
        <WeatherForecast data={forecastQuery.data} />
      </div>
       
     </div> }
    
  </div>);
};

export default WeatherDashBoard;
