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
    const [seconds, setSeconds] = useState(40);
    var myVar;
  useEffect(() => {
    if (seconds > 0 ) {
      myVar=setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setResult('lose')
    }
  },[seconds]);

  function myStopFunction() {
    clearTimeout(myVar);
    setSeconds(40)
  }
  return (
    <TimerContext.Provider value={{seconds,result}}>
      <TimerContextUpdate.Provider value={{myStopFunction,setResult}}>
        {children}
      </TimerContextUpdate.Provider>
    </TimerContext.Provider>
  )
}
