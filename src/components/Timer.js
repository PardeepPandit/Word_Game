import React, { Fragment } from 'react'
import { useTimerConsumer } from './TimerContext'

export const Timer = () => {

  const {seconds, loser } = useTimerConsumer()
  function refreshPage() {
    window.location.reload(false)
  }
  return (
    <Fragment>
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
