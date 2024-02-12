// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    currentTime: 25 * 60,
    isClockStarted: false,
    isTimeReset: true,
    timerId: 0,
    timeSet: 25,
    stopped: true,
  }

  playPauseClick = () => {
    const {isClockStarted} = this.state
    isClockStarted ? this.pauseClock() : this.resumeClock()
  }

  resumeClock = () => {
    const resFunc = () => {
      const {currentTime, stopped} = this.state
      if (currentTime !== 0 || !stopped) {
        this.setState(prevState => ({
          timerId,
          isClockStarted: true,
          isTimeReset: false,
          currentTime: prevState.currentTime - 1,
        }))
      } else if (this.state.stopped) {
        this.playPauseClick()
        this.setState({stopped: false})
      }
    }

    const timerId = setInterval(resFunc, 1000)
  }

  pauseClock = () => {
    clearInterval(this.state.timerId)
    this.setState({isClockStarted: false})
  }

  increaseTime = () => {
    const {isTimeReset} = this.state
    if (isTimeReset) {
      this.setState(prevState => ({
        currentTime: prevState.currentTime + 60,
        timeSet: prevState.timeSet + 1,
      }))
    }
  }

  decreaseTime = () => {
    const {isTimeReset} = this.state
    if (isTimeReset) {
      this.setState(prevState => ({
        currentTime: prevState.currentTime - 60,
        timeSet: prevState.timeSet - 1,
      }))
    }
  }

  onReset = () => {
    const {timerId} = this.state
    clearInterval(timerId)
    this.setState({
      currentTime: 25 * 60,
      isClockStarted: false,
      isTimeReset: true,
      timerId: 0,
      timeSet: 25,
    })
  }

  render() {
    console.log(this.state)
    const {currentTime, isClockStarted, isTimeReset, timeSet} = this.state
    const buttoImageUrl = isClockStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altText = isClockStarted ? 'pause icon' : 'play icon'
    const paraText = isClockStarted ? 'Pause' : 'Start'
    const timerDisplayText = isClockStarted ? 'Running' : 'Paused'

    const currentMinutes =
      currentTime / 60 < 10 && !(currentTime / 60 < 0)
        ? `0${Math.floor(currentTime / 60)}`
        : Math.floor(currentTime / 60)
    const currentSeconds =
      currentTime % 60 < 10 && !(currentTime % 60 < 0)
        ? `0${currentTime % 60}`
        : currentTime % 60

    return (
      <div className="digitalTimerComponent">
        <h1>Digital Timer</h1>
        <div className="timer">
          <div className="timerDiv">
            <div className="timerTime">
              <h1 className="timerPara">
                {currentMinutes}:{currentSeconds}
              </h1>
              <p className="timerStatus">{timerDisplayText}</p>
            </div>
          </div>
          <div className="timerController">
            <div className="mainButtons">
              <button
                type="button"
                className="playPauseButton"
                onClick={this.playPauseClick}
              >
                <img
                  alt={altText}
                  className="startResetButton"
                  src={buttoImageUrl}
                />
                <p>{isClockStarted ? 'Pause' : 'Start'}</p>
              </button>
              <button className="playPauseButton" onClick={this.onReset}>
                <img
                  className="startResetButton"
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                Reset
              </button>
            </div>
            <p className="timerMessage">Set Timer Limit</p>
            <div className="timeSetter">
              <button onClick={this.decreaseTime} className="setButton">
                -
              </button>
              <p className="setText">{timeSet}</p>
              <button onClick={this.increaseTime} className="setButton">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
