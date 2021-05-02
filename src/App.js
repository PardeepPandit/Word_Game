import React, { Fragment } from 'react'
import './App.css'
import { TimerProvider} from './components/TimerContext'
import Display from './components/Display'
import Timer from './components/Timer'
import Dictionary from './components/Dictionary'
import { DictionaryProvider } from './components/DictionaryContext'

function App() {

  return (
    <TimerProvider>
      
        <div className='main'>
          <Timer/>
          <DictionaryProvider>  
          <Display />
          <Dictionary/>
          </DictionaryProvider>
        </div>
      
    </TimerProvider>
  );
}
export default App;
