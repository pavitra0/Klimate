import {useLocalStorage} from './use-local-storage';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';


interface FavoriteCity {
  id: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?:string;
  addedAt: number;
}

export function useFavorite(){

const queryClient = useQueryClient();
  
const [favorites,setFavorites] = useLocalStorage<FavoriteCity[]>("favorites",[]);

 const favoritesQuery = useQuery({
    queryKey:["favorites"],
    queryFn:()=> favorites,
   staleTime:Infinity,
    initialData:favorites,
  })

   const addFavorite = useMutation({
    mutationFn:async(city:Omit<FavoriteCity, "id" | "addedAt">) =>{
      const newFavorite:FavoriteCity ={
        ...city,
        //yaha change he
        id:`${city.lat}-${city.lon}`,
        addedAt:Date.now(),
      };


      //yaha bhi
      const exists = favorites.some(fav => fav.id === newFavorite.id);
if(exists){
  return favorites
} 

      
      const newFavorites = [...favorites,newFavorite].slice(0,10);

     setFavorites(newFavorites);
      return newFavorites;
    },
     onSuccess:()=>{
       queryClient.invalidateQueries({
         queryKey:["favorites"],
       });
     }
     
  })

  const removeFavorite = useMutation({
    mutationFn:async(cityId:string)=>{
      const newFavorites = favorites.filter(fav => fav.id !== cityId);
      setFavorites(newFavorites)
      return newFavorites;
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["favorites"],
        
      })
    }
  })

  return {
favorites:favoritesQuery.data,
    addFavorite,
    removeFavorite,
    isFavorite:(lat:number,lon:number)=>{
     return favorites.some((city) => city.lat === lat && city.lon === lon)
    }
    
  }
}