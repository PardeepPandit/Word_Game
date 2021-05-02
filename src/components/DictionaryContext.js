import React,{useContext,createContext,useEffect,useState} from 'react'
import axios from 'axios'
const DictionaryContext=createContext();
const DictionaryContextUpdate=createContext();
export function useDictionaryConsumer(){
  return useContext(DictionaryContext)
}
export function useDictionaryConsumerUpdate(){
  return useContext(DictionaryContextUpdate)
}


export const DictionaryProvider=({children})=>{

  const [searchStr,setSearchStr]=useState();
  const [words,setWords]=useState([])
  const [loading,setLoading]=useState(false)
  /* console.log("serch word=",searchStr)
  useEffect(async()=>{
      setLoading(true)
      const res=await axios.get(`https://api.datamuse.com/words?sp=${searchStr}*`)
        setWords(JSON.stringify(res.data))
      console.log(res.data[1])
      setLoading(false)
  },[]) */

  return(
    <DictionaryContext.Provider value={{loading,words,searchStr}}>
      <DictionaryContextUpdate.Provider value={setSearchStr}>
          {children}
      </DictionaryContextUpdate.Provider>
    </DictionaryContext.Provider>
  )

}