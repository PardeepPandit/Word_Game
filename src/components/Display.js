import React, { useState, useEffect, Fragment } from 'react'
import Timer from './Timer';
import axios from 'axios'
import { useTimerConsumer, useTimerConsumerUpdate } from './TimerContext'
var val;
export const Display = () => {

  const {clearTime,setResult,setLoser,resetTime} = useTimerConsumerUpdate();
  const { result ,loser} = useTimerConsumer();
  const [bool,setBool]=useState({name2:'',boola:false})//1
  var alphabets = 'ABCDFGHIJKLMNOPQRSTUVWXYZ';
  const [character, setCharacter] = useState('');
  const [once, setOnce] = useState(() => { return false })
  ////////////////////////////

  const [wordList, setWordList] = useState([])
  const [loading, setLoading] = useState(false)


  /////////////////////////////
  const getRandomChar = () => {
    let char = '';
    let flag = true
    if (true) {
      const charLength = alphabets.length;
      char = alphabets.charAt(Math.floor(Math.random() *
        charLength));

      while (flag) {
        if (char === 'X' || char === 'Y' || char === 'Z') {
          char = getRandomChar();
        } else {
          flag = false;
        }
      }
    }
    
    return char
  }
  const [inputText, setInputText] = useState(() => {
    console.log("initialstate")
    return getRandomChar()
  });


//Fetching Data API
useEffect(async () => {
  {loser.out && setLoading(true)
    const res = await axios.get(`https://api.datamuse.com/words?sp=${inputText}*`)
    
    if(res.data.length===0){
        setResult('lose')
    }else{
        setWordList(res.data)
    }
    setLoading(false)
    turnControler(res.data,res.data.length);
    
}

}, [inputText])

  
useEffect(() => {

  if(loser.out===true){
    callMyStopFun();
  }
},[loser])

const callMyStopFun=()=>{
  clearTime()
}

  const computerTurn=()=>{
   
    once && setTimeout(() => {
     
      setLoser({name:'Computer',out:false});
    
      let char=findChar()
      char=char.charAt(0).toUpperCase()
      setInputText(pre => pre + char);
   
      setCharacter(char)
   
      setOnce(false)
     
    }, 2000)
    
  }
  

  //Find character form random word
  const findChar=()=>{

        const randomword = Math.floor(Math.random() * wordList.length);
        const guesschar=wordList[randomword].word.charAt((inputText.length))
        return guesschar
        
  } 

  const turnControler=(data,len)=>{

    if((loser.name==='You' || loser.name==='Computer') && len>0 && once){
      val=data.find((item)=>{
        return item.word.toUpperCase()===inputText.toUpperCase()
      })
    
      if(val){
        setLoser(pre=>({...loser,out:true}));
        setOnce(false)
        clearTimeout()
        return 
      }
    }
    
      if(once && len>0){
      computerTurn()
    }
    if(len<=0){
      clearTimeout()
    }
  }


  const myTurn = (e) => {
    let currentChar = e.target.value;
    currentChar = currentChar.charAt(currentChar.length - 1)
    setInputText(pre => pre + currentChar);
    setCharacter(currentChar)
    resetTime()
    setOnce(true)
  }
  return (
    <Fragment>
      {/* {console.log("out=",loser.out)} */}
      {!loser.out ? <input type='text' className='input-field' value={inputText} placeholder='Enter charachter' onChange={e => myTurn(e)}></input>:''}

      {/* {inputText} */}
      {JSON.stringify(val)}
      <br></br>
     {/*  {!loading && wordList.length} */}
      <br></br>
      {/* {!loading && JSON.stringify(wordList)} */} 
    </Fragment>

  )
}
export default Display