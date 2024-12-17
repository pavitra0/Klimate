import {useLocalStorage} from './use-local-storage';
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';


interface SearchHistoryItem {
  query: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?:string;
  searchedAt: number;
}

export function useSearchHistory(){

const queryClient = useQueryClient();
  
const [history,setHistory] = useLocalStorage<SearchHistoryItem[]>("search-history",[]);

 const historyQuery = useQuery({
    queryKey:["search-history"],
    queryFn:()=> history,
    initialData:history,
  })

   const addToHistory = useMutation({
    mutationFn:async(search:Omit<SearchHistoryItem, "id" | "searchedAt">) =>{
      const newSearch:SearchHistoryItem ={
        ...search,
        //yaha change he
        id:history.length+1,
        searchedAt:Date.now(),
      };


      //yaha bhi
      const filteredHistory = history.filter((item)=>item.query !== search.query);

      const newHistory = [newSearch,...filteredHistory].slice(0,10);

     setHistory(newHistory);
      return newHistory;
    },
     onSuccess:()=>{
       //@ts-ignore
       queryClient.setQueryData(["search-history"],newHistory)
     }
     
  })

  const clearHistory = useMutation({
    mutationFn:async()=>{
      
      setHistory([] )
      return []
    },
    onSuccess:()=>{
      queryClient.setQueryData(["search-history"],[])
    }
  })

  return {
history:historyQuery.data??[],
    addToHistory,
    clearHistory,
    
  }
}