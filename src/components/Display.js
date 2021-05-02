import React, { useState, useEffect, Fragment } from 'react'
import Timer from './Timer';
import axios from 'axios'
import { useTimerConsumer, useTimerConsumerUpdate } from './TimerContext'
/*import {useDictionaryConsumerUpdate} from './DictionaryContext' */
var val;
export const Display = () => {
  //console.log("Display rendring")
  const {myStopFunction,setResult,setLoser} = useTimerConsumerUpdate();
  /*const setSearchStr=useTimerConsumerUpdate(); */
  const { result ,loser} = useTimerConsumer();
  //const [loser,SetLoser]=useState({name:'dummy',out:false});

  var alphabets = 'ABCDEFWXYZ';
  const [character, setCharacter] = useState('');
  const [once, setOnce] = useState(() => { return false })
  ////////////////////////////

  const [searchStr, setSearchStr] = useState('');
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
        //console.log("char=",char)
        if (char === 'X' || char === 'Y' || char === 'Z') {
          char = getRandomChar();
        } else {
          //console.log("Exit")
          flag = false;
        }
      }
    }
    else {
      //setSearchStr(pre=>pre)
    }
    
    return char
  }
  const [inputText, setInputText] = useState(() => {
    console.log("initialstate")
    return getRandomChar()
  });
//Search API
useEffect(async () => {
    
  console.log("fetching data for====>",inputText)
  {loser.out && setLoading(true)
    console.log("loser=",loser.name,",",loser.out)
    console.log("calling api for str=", inputText)
    const res = await axios.get(`https://api.datamuse.com/words?sp=${inputText}*`)
    //console.log("length=",res.data)
    if(res.data.length===0){
        setResult('lose')
        //SetLoser(true)
        //setWordList(['empty'])
    }else{
        setWordList(res.data)
        //setWordList(JSON.stringify(res.data))
        console.log("wordList data=",res.data)
    }
    setLoading(false)
    turnControler(res.data,res.data.length);
    
} 
}, [character])



  const computerTurn=()=>{
    //setSearchStr(inputText)
    
    once && setTimeout(() => {
      console.log("Computer Turn")
      //console.log("serching word=", inputText)
      //let char = getRandomChar()
      let char=findChar()
      char=char.charAt(0).toUpperCase()
      setInputText(pre => pre + char);
       
      //setSearchStr(inputText)
      console.log("Computer Entered=",char)
      setCharacter(char)
      console.log("computer has set character")
      //SetLoser({name:'computer Lose',exit:false})
      //console.log("now searchStr=", inputText)
      
      //myStopFunction()
    }, 3000)
    setLoser({name:'Computer',out:false});
    setOnce(false)
    console.log("exit from computerTurn=",once)
    
  }
  

  
  const findChar=()=>{

        const randomword = Math.floor(Math.random() * wordList.length);
        const guesschar=wordList[randomword].word.charAt((inputText.length))

        if(inputText.length < wordList[randomword].word.length){
          console.log("inputText length=",inputText,",", inputText.length);
        console.log("Random word length=",wordList[randomword],",", wordList[randomword].word.length)
        console.log("guess char=",guesschar)
        console.log("RANDOM WORD=",randomword, wordList[randomword]);
        }
        else{
          console.log("No character Found")
        }

        return guesschar
        
  } 

  const turnControler=(data,len)=>{
    //setWordList(data)
    console.log("inside turn controler",loser.name,",",len);
    if((loser.name==='You' || loser.name==='Computer') && len>0){

      console.log("inputText=========>",inputText)
      console.log("val before============>",data)
      val=data.find((item)=>{
        return item.word.toUpperCase()===inputText.toUpperCase()
      })
      console.log("val========================>",val)
      if(val){
        console.log("value matched============>",val)
        setLoser(pre=>({...loser,out:true}));
        setOnce(false)
        console.log("calling my stop function====>>",loser.name,",",loser.out)
        myStopFunction()
        return 
      }
    }
    
      if(once && len>0){
      console.log("calling computerTurn=",once)
      computerTurn()
    }
    if(len<=0){
      setLoser(pre=>({...loser,out:true}));
      //myStopFunction()
    }
    
    
      
  }


  const myTurn = (e) => {
    console.log("My Turn")
    setOnce(true)
    let currentChar = e.target.value;
    currentChar = currentChar.charAt(currentChar.length - 1)
    setInputText(pre => pre + currentChar);
    console.log("Me Entered", currentChar)
    //SetLoser(pre=>{return {...pre,name:'Human Lose',exit:false}})
    setLoser({name:'You',out:false})
    //console.log(loser.name);
    setCharacter(currentChar)
    myStopFunction()
  }
  return (
    <Fragment>
      {console.log("chek it=",loser.out)}
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