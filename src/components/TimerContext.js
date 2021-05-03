import React,{useContext,useState,useEffect} from 'react'

const TimerContext=React.createContext();
const TimerContextUpdate=React.createContext();

export function useTimerConsumer(){
  return useContext(TimerContext)
}

export function useTimerConsumerUpdate(){
  return useContext(TimerContextUpdate)
}

export function TimerProvider({children}){

  const[result,setResult]=useState(()=>'win');
  const [loser,setLoser]=useState({name:'You',out:false});
  const [seconds, setSeconds] = useState(10);
    var myVar;
  useEffect(() => {
    if (seconds > 0 ) {
      myVar=setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setLoser(pre=>({...loser,out:true}))
    }
  },[seconds]);

  function resetTime(){
    clearTimeout(myVar)
    setSeconds(10)
  }

  function clearTime() {
    clearTimeout(myVar);
  }

  return (
    <TimerContext.Provider value={{seconds,result,loser}}>
      <TimerContextUpdate.Provider value={{clearTime,setResult,setLoser,setSeconds,resetTime}}>
        {children}
      </TimerContextUpdate.Provider>
    </TimerContext.Provider>
  )
}
