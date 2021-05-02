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
  const [loser,setLoser]=useState({name:'dummy',out:false});
    const [seconds, setSeconds] = useState(10);
    var myVar;
  useEffect(() => {
    if (seconds > 0 ) {
      myVar=setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      console.log("time out")
      //myStopFunction();
      setLoser({name:"You",out:true})
    }
  },[seconds]);

  function myStopFunction() {
    console.log("my stop funvtion=====>",loser.name,",",loser.out)
    clearTimeout(myVar);
    
    if(loser.name==='Computer' && loser.out===false){
      console.log("timer stoppppppp")
    }
    else if(!loser.out)
    {
      setSeconds(10)
    }
  
    
  }
  return (
    <TimerContext.Provider value={{seconds,result,loser}}>
      <TimerContextUpdate.Provider value={{myStopFunction,setResult,setLoser}}>
        {children}
      </TimerContextUpdate.Provider>
    </TimerContext.Provider>
  )
}
