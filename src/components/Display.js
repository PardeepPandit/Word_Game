import React, { useState, useEffect, Fragment } from 'react'
import Timer from './Timer';
import axios from 'axios'
import { useTimerConsumer, useTimerConsumerUpdate } from './TimerContext'
/*import {useDictionaryConsumerUpdate} from './DictionaryContext' */

export const Display = () => {
  const {myStopFunction,setResult} = useTimerConsumerUpdate();
  /*const setSearchStr=useTimerConsumerUpdate(); */
  const { result } = useTimerConsumer();
  const [loser,SetLoser]=useState({name:'dummy',out:false});

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
      
      
    }, 4000)
    SetLoser({name:'Computer',out:false});
    setOnce(false)
    console.log("exit from computerTurn=",once)
  }
  

  //Search API
  useEffect(async () => {
    
    console.log("fetching data")
    {loser.out && setLoading(true)
      console.log("loser=",loser.name,",",loser.out)
      console.log("calling api for str=", inputText)
      const res = await axios.get(`https://api.datamuse.com/words?sp=${inputText}*`)
      //console.log("length=",res.data)
      if(res.data.length===0){
          setResult('lose')
          //SetLoser(true)
          setWordList(['empty'])
      }else{
          setWordList(res.data)
          //setWordList(JSON.stringify(res.data))
          //console.log(res.data)
      }
      setLoading(false)
      turnControler(res.data.length);
      
  } 
  }, [character])

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

  const turnControler=(len)=>{
    if((loser.name==='Human' || loser.name==='Computer') && len>0){

      //console.log("inputText=========>",inputText)
      //console.log("val before============>",wordList)
      const val=wordList.find((item)=>{
        return item.word.toUpperCase()===inputText.toUpperCase()
      })
      console.log("val========================>",val)
      if(val){
        SetLoser(pre=>({...loser,out:true}));
        setOnce(false)
        return 
      }
    }
    
      if(once && len>0){
      console.log("calling computerTurn=",once)
      computerTurn()
    }
    if(len<=0){
      SetLoser(pre=>({...loser,out:true}));
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
    SetLoser({name:'Human',out:false})
    //console.log(loser.name);
    setCharacter(currentChar)
    myStopFunction()
  }
  return (
    <Fragment>
      {console.log("chek it=",loser.out)}
      {!loser.out ? <input type='text' className='input-field' value={inputText} placeholder='Enter charachter' onChange={e => myTurn(e)}></input>:<h1>{loser.name} Lose</h1>}
      

        {/* {result === 'win' ? <div className='main'>
        <input type='text' className='input-field' value={inputText} placeholder='Enter charachter' onChange={e => myTurn(e)}></input>

      </div> : loser.name+"Lose"} */} 

      {inputText}
      <br></br>
      {!loading && wordList.length}
      <br></br>
      {!loading && JSON.stringify(wordList)} 
    </Fragment>

  )
}
export default Display