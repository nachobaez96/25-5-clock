import React, { useState, useEffect, useRef } from 'react'
import './Clock.css'

const Clock = () => {
  const [sessionLength, setSessionLength] = useState(25)
  const [breakLength, setBreakLength] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [isBreak, setIsBreak] = useState(false)
  const [timerStarted, setTimerStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let timer
    if (timerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1)
      }, 1000)
    }
    if (timerStarted && seconds === 0) {
      clearInterval(timer);
      if (isBreak) {
        setSeconds(sessionLength);
        setIsBreak(false);
      } else {
        setSeconds(breakLength);
        setIsBreak(true);
      }
    }

    return () => {
      clearInterval(timer)
    }
  }, [seconds, isBreak, isPaused])


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

  const startTimer = () => {
    if (isPaused) {
      setTimerStarted(true)
      setIsPaused(false)
    } else {
      setTimerStarted(true)
      if (isBreak) {
        setSeconds(breakLength)
      } else {
        setSeconds(sessionLength)
      }
    }
  }

  const pauseTimer = () => {
    setTimerStarted(false)
    setIsPaused(true)
  }

  return (
    <div className="clock">
      <h1>25 + 5 Clock</h1>
      <div className="timer">
        <h2>Session or break</h2>
        <p>{seconds}</p>
      </div>
      <div className="controls">
        <button onClick={timerStarted ? pauseTimer : startTimer}>
          {timerStarted ? "Pause" : "Start"}
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
