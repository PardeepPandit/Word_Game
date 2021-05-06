import React from 'react'
import './App.css'
import { TimerProvider} from './components/TimerContext'
import Display from './components/Display'
import Timer from './components/Timer'

function App() {
  return (
    <TimerProvider>
        <div className='main'>
          <h1 className='heading'>Word Game</h1>
            <Timer/> 
             <Display /> 
        </div>
    </TimerProvider>
  );
}
export default App;
