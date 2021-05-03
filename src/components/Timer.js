import React, { Fragment } from 'react'
import { useTimerConsumer } from './TimerContext'

export const Timer = () => {

  const { result, seconds, loser } = useTimerConsumer()
  function refreshPage() {
    window.location.reload(false);
  }
  //console.log(seconds,",",result)
  return (
    <Fragment>
     {/*  <div className='time-main'><p>Time-Left</p><div className='timer'>{seconds}</div></div>
      <div className='time-main'><p>Time+Left</p><div className='timer'>{seconds}</div></div> */}
      {!loser.out ?
        <div className='time-main'><p>Time Left</p><div className='timer'>{seconds}</div></div> :
        <Fragment><h1>{loser.name} Lost</h1>
        <br></br>
        <button className='btn' onClick={refreshPage}>Try Again</button>
        </Fragment>
        }
    </Fragment>


  )
}
export default Timer
