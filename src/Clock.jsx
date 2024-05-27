import React, { useState, useEffect, useRef } from 'react'
import './Clock.css'

const Clock = () => {
  const [sessionLength, setSessionLength] = useState(25)
  const [breakLength, setBreakLength] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [isBreak, setIsBreak] = useState(false)
  const [timerStarted, setTimerStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const bell = new Audio('./assets/audio/bell.mp3')

  useEffect(() => {
    let timer
    if (timerStarted && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1)
      }, 1000)
    }
    if (timerStarted && seconds === 0) {
      bell.play()
      clearInterval(timer)
      if (isBreak) {
        setSeconds(sessionLength * 60)
        setIsBreak(false)
      } else {
        setSeconds(breakLength * 60)
        setIsBreak(true)
      }
    }

    return () => {
      clearInterval(timer)
    }
  }, [seconds, isBreak, isPaused, timerStarted])


  const addSessionLength = () => {
    setSessionLength((prevSessionLength) => prevSessionLength + 1)
  }

  const subtractSessionLength = () => {
    sessionLength > 1 && setSessionLength((prevSessionLength) => prevSessionLength - 1)
  }

  const addBreakLength = () => {
    setBreakLength((prevBreakLength) => prevBreakLength + 1)
  }

  const subtractBreakLength = () => {
    breakLength > 1 && setBreakLength((prevBreakLength) => prevBreakLength - 1)
  }

  const startTimer = () => {
    if (isPaused) {
      setTimerStarted(true)
      setIsPaused(false)
    } else {
      setTimerStarted(true)
      if (isBreak) {
        setSeconds(breakLength * 60)
      } else {
        setSeconds(sessionLength * 60)
      }
    }
  }

  const pauseTimer = () => {
    setTimerStarted(false)
    setIsPaused(true)
  }

  const resetTimer = () => {
    setTimerStarted(false)
    setIsBreak(false)
    setSeconds(sessionLength * 60)
  }

  const formatTime = (time) => {
    const minutesLeft = Math.floor(time / 60)
    const secondsLeft = time % 60
    return (`${minutesLeft < 10 ? '0' : ''}${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`)
  }

  return (
    <div className="clock">
      <h1>25 + 5 Clock</h1>
      <div className="timer">
        <h2>{isBreak ? "Break" : "Session"}</h2>
        <p>{formatTime(seconds)}</p>
      </div>
      <div className="controls">
        <button onClick={timerStarted ? pauseTimer : startTimer}>
          {timerStarted ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer}>Reset</button>
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
