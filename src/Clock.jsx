import React, { useState, useEffect, useRef } from 'react'
import './Clock.css'

const Clock = () => {
  const [sessionLength, setSessionLength] = useState(25)
  const [breakLength, setBreakLength] = useState(5)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1)
      }, 1000)
  
      return () => clearInterval(timer)
    }
  }, [seconds])
 
  const addSessionLength = () => {
    setSessionLength((prevSessionLength) => prevSessionLength + 1)
  }

  const subtractSessionLength = () => {
    setSessionLength((prevSessionLength) => prevSessionLength - 1)
  }

  const addBreakLength = () => {
    setBreakLength((prevBreakLength) => prevBreakLength + 1)
  }

  const subtractBreakLength = () => {
    setBreakLength((prevBreakLength) => prevBreakLength - 1)
  }

  return (
    <div className="clock">
      <h1>25 + 5 Clock</h1>
      <div className="timer">
        <h2>Session or break</h2>
        <p>{seconds}</p>
      </div>
      <div className="controls">
        <button>
          Pause or start
        </button>
        <button>Reset</button>
      </div>
      <div className="length-controls">
        <div>
          <h3>Session Length</h3>
          <button onClick={subtractSessionLength}>-</button>
          <span>{sessionLength}</span>
          <button onClick={addSessionLength}>+</button>
        </div>
        <div>
          <h3>Break Length</h3>
          <button onClick={subtractBreakLength}>-</button>
          <span>{breakLength}</span>
          <button onClick={addBreakLength}>+</button>
        </div>
      </div>
    </div>
  )
}

export default Clock
