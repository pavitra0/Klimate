import { useState } from 'react';
import {CommandDialog,CommandGroup,CommandEmpty,CommandItem,CommandList,CommandInput,CommandSeparator} from './ui/command';
import {useFavorite} from '../hooks/use-favorite'
import {Search,Loader2,Star} from "lucide-react"
import {useNavigate} from "react-router-dom"
import {XCircle,Clock} from "lucide-react"
import {Button} from './ui/button'
import {useLocationSearch} from "../hooks/use-weather"
import {useSearchHistory} from "../hooks/use-search-history"
import {format} from 'date-fns'


const CitySearch = () => {
  
  const [open,setOpen]=useState(false)
  const [query,setQuery] =useState(``)
  const navigate = useNavigate()
  const {data:locations, isLoading} = useLocationSearch(query)
  
  function cleanLocationString(value: string | undefined): string {
  return value?.replace(/\s*,\s*/g, ", ").trim() || "";
  }
  
  
  const{history,addToHistory,clearHistory} = useSearchHistory()



  const {favorites} = useFavorite()
  
const handleSelect = (cityData:string)=>{
  const [lat,lon,country,name] = cityData.split("|")

//add to search history
  addToHistory.mutate({
    query,name,lat:parseFloat(lat),lon:parseFloat(lon),country,
  })
  
  navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
setOpen(false)
  
  setQuery(name) 
}
  

  return (<>
  <Button className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-40"
    variant="outline"
    onClick={()=> setOpen(true)}>
    Search cities..
    <Search className="ml-2 h-4 w-4" />
    </Button>
  
    <CommandDialog open={open} onOpenChange={setOpen} >
    <CommandInput placeholder="Search cities..." value={query} onValueChange={setQuery} />
      <CommandList>
        { query.length > 2 && !isLoading && <CommandEmpty>No cities found</CommandEmpty>}

        
                { favorites.length > 0 &&
        
          <CommandGroup      heading="Favorites">

            {favorites.map((location) => (
                    <CommandItem
                      key={`recent-${location.id}`}
                      value={`${location.lat}|${location.lon}|${location.country}|${location.name}`}
                      onSelect={handleSelect}
                    >
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      <span>{cleanLocationString(location.name)}, </span>
                      {location.state && (
                        <span className="text-sm text-muted-foreground">{cleanLocationString(location.state)}, 
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">{cleanLocationString(location.country)}
                      </span>
                
                    </CommandItem>
                  ))}
        </CommandGroup>
        
            }
        
        { history.length > 0 &&
          <>
          <CommandSeparator />
          <CommandGroup      heading="Recent Searches">
            <div className="flex items-center justify-between px-2 my-2">
              <p className="text-sm text-muted-foreground">Recent Searches</p>
              <Button onClick={()=>clearHistory.mutate()} variant="ghost" size="sm" >
                Clear
              <XCircle className="w-4 h-4" />
              </Button>
            </div>
        {history.map((location) => (
                    <CommandItem
                      key={`recent-${location.query}`}
                      value={`${location.lat}|${location.lon}|${location.country}|${location.name}`}
                      onSelect={handleSelect}
                    >
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{cleanLocationString(location.name)}, </span>
                      {location.state ? (<span className="text-sm text-muted-foreground">{cleanLocationString(location.state)}
                        </span>
                      ):null}<span className="text-sm text-muted-foreground">{cleanLocationString(location.country)}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {format(location.searchedAt, "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  ))}
        </CommandGroup>
          </> 
            }

            
          <CommandSeparator />
        {locations && locations.length >0 && <CommandGroup  heading="Suggestions">
          {isLoading && (
    <div className="p-4 flex items-center justify-center">
    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
    </div>
          )}
          {locations.map(location =>{
    return <CommandItem   key={`city-${location.name}`} value={`${location.lat}|${location.lon}|${location.country}|${location.name}`} onSelect={handleSelect}>
      <Search className="mr-2 w-4 h-4" /><span>{cleanLocationString(location.name)},</span>{location.state && (
      <span className="text-sm text-muted-foreground">{location.state ? (`${cleanLocationString(location.state)}, `) : null}</span>
      )}<span className="text-sm text-muted-foreground">{cleanLocationString(location.country)}</span>
    </CommandItem>
          })}

        </CommandGroup>}
      </CommandList>
    </CommandDialog>
    </>
  );
};

export default CitySearch;