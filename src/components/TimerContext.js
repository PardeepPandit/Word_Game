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
    console.log("Seconds in useEffect=",seconds)
    if (seconds > 0 ) {
      myVar=setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      console.log("time out")
      //myStopFunction();
      setLoser(pre=>({...loser,out:true}))
    }
  },[seconds]);

  function resetTime(){
    console.log("Before Reset Time=",myVar)
    clearTimeout(myVar)
    setSeconds(10)
    console.log("After Reset Time=",myVar)
  }

  function clearTime() {
    console.log("MyVAR==========>",myVar)
     console.log("my stop funvtion=====>",loser.name,",",loser.out)
     clearTimeout(myVar);
    
    if(loser.name==='Computer' && loser.out===false){
      console.log("timer stoppppppp")
    }
     
    

   /*  clearTimeout(myVar);
    console.log("my stop funvtion=====>",loser.name,",",loser.out,",*",myVar)
    if(loser.out){
      console.log("timer stoppppppp=",seconds)
      setSeconds(null)
    }
    else if(!loser.out)
    {
      console.log("Restarting Time")
      setSeconds(10)
    }   */
  }

  return (
    <TimerContext.Provider value={{seconds,result,loser}}>
      <TimerContextUpdate.Provider value={{clearTime,setResult,setLoser,setSeconds,resetTime}}>
        {children}
      </TimerContextUpdate.Provider>
    </TimerContext.Provider>
  )
}
