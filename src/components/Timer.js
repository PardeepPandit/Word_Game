import React,{ Fragment} from 'react'
import {useTimerConsumer} from './TimerContext'

export const Timer = () => {
 const context = useTimerConsumer()
 const {result,seconds}=context 
 //console.log(seconds,",",result)
  return (
    <Fragment>
      {result==='win' ? 
      <div className='time-main'><p>Time Left</p><div className='timer'>{seconds}</div></div> :
      <h1>Stop</h1>}
    </Fragment>
    
    
  )
}
export default Timer
