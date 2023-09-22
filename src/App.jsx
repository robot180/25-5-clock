import { useState, useEffect, useRef} from 'react'
import './styles.css'

function App() {
  //useRef - is it currently break or session
  // const isBreakTime = useRef(false)
  const [isBreakTime, setBreak] = useState(false)
  //useRef - is the timer currently paused?
  const [timerOn, setTimer] = useState(false)
  //useRef - ID so that setInterval can be cleared
  const intervalID = useRef()
  const [type, setType] = useState('Study Time')

  //useState: user set session length, cannot be adjusted when timer is on. if adjusted during a paused session,  the session countdown timer is reset to new length
  const [sessionLength, setSessionLength] = useState('25')
  //useState: user set break length, cannot be adjusted when timer is on. if adjusted during a paused break, the break countdown timer is reset to new length
  const [breakLength, setBreakLength] = useState('5')

  //useRef: keep track of the minutes countdown of current session or break
  const sessionMinutesRemainingRef = useRef(sessionLength)
  const breakMinutesRemainingRef = useRef(breakLength)

  //useRef: keep track of the seconds countdown of current session or break
  const secondsRemainingRef = useRef(60);

  //useState: display the remaining minutes of current session/break
  const [minutesDisplay, setDisplayMinutes] = useState(sessionLength)
  //useState: display the remaining seconds of current session/break
  const [secondsDisplay, setDisplaySeconds] = useState('00');

   useEffect(() => {
    console.log('new useEffect')
    console.log(`timer is on ${timerOn}`)
    if (timerOn == true ) {
      intervalID.current = setInterval(() => {
        if (isBreakTime == false) {
          sessionCountDown();
        } else {
          // console.log("it's breaktime!")
          breakCountDown();
        };
      }, "1000")
    }
        return () => {
      clearInterval(intervalID.current)
    };
  }, [timerOn, isBreakTime, breakLength, sessionLength]);

  function sessionCountDown() {
      switch (secondsRemainingRef.current) {
        case 60:
            setDisplayMinutes((prevState) => (parseInt(prevState)-1).toString())
            console.log(minutesDisplay)
            sessionMinutesRemainingRef.current --;
            console.log(sessionMinutesRemainingRef.current)
            console.log(`sessionMinutesRemainingRef: ${sessionMinutesRemainingRef.current}`)
            // console.log(`minutes remaining: ${minutes}`)
            if (sessionMinutesRemainingRef.current == -1) {
              console.log('a break is about to start') 
              //play audio
              const clip = document.getElementById('beep')
              // clip.play();
              setType('Break Time')
              sessionMinutesRemainingRef.current = sessionLength;
              secondsRemainingRef.current = 60;
              setDisplayMinutes(breakLength);      
              console.log('settimeout is running')
              // isBreakTime.current = !isBreakTime.current
              setBreak(true) 
              break;
            } 
            secondsRemainingRef.current-- 
            console.log(secondsRemainingRef.current)
            let x = secondsRemainingRef.current.toString();
            setDisplaySeconds(x)
            break;
        case 1:
            secondsRemainingRef.current = 60
            console.log(secondsRemainingRef.current)
            setDisplaySeconds('00')
          break
        default:
            secondsRemainingRef.current-- 
            console.log(secondsRemainingRef.current)
            let z = secondsRemainingRef.current.toString();
            z = z.replace(/^(\d)$/, '0$1');
            setDisplaySeconds(z)
          break
      }
    } 



  function breakCountDown() {
      switch (secondsRemainingRef.current) {
        case 60:
            setDisplayMinutes((prevState) => (parseInt(prevState)-1).toString())
            // console.log(minutesDisplay)
            breakMinutesRemainingRef.current --;
            console.log(`breaMinutesRemainingRef: ${breakMinutesRemainingRef.current}`)
            // console.log(`minutes remaining: ${minutes}`)
            if (breakMinutesRemainingRef.current == -1) {
              console.log('a session is about to start');
              setType('Study Time')
              breakMinutesRemainingRef.current = breakLength;
              secondsRemainingRef.current = 5;
              setDisplayMinutes(sessionLength);
              // isBreakTime.current = !isBreakTime.current
              setBreak(false)
              break;
            } 
            secondsRemainingRef.current-- 
            console.log(secondsRemainingRef.current)
            let x = secondsRemainingRef.current.toString();
            setDisplaySeconds(x)
            break;
        case 1:
            secondsRemainingRef.current = 60
            console.log(secondsRemainingRef.current)
            setDisplaySeconds('00')
          break
        default:
            secondsRemainingRef.current-- 
            console.log(secondsRemainingRef.current)
            let z = secondsRemainingRef.current.toString();
            z = z.replace(/^(\d)$/, '0$1');
            setDisplaySeconds(z)
          break
      }
    } 
  
  const changeLength = (e) => {
    console.log('changeLength running')
    if (timerOn == false) {
      let a
      switch (e.target.id) {
        case 'break-increment':
        //  (parseInt(breakLength) + 1 > 60)? setBreakLength('60') : setBreakLength((prevState) => (parseInt(prevState)+1).toLocaleString())
          a = parseInt(breakLength) + 1
          if (a < 61) {
            breakMinutesRemainingRef.current = a;
            secondsRemainingRef.current = 60;
            setBreakLength(a.toString());
          }
          break;
        case 'break-decrement':
          // (parseInt(breakLength) - 1 < 1)? setBreakLength('1') : setBreakLength((prevState) => (parseInt(prevState)-1).toLocaleString())
          a = parseInt(breakLength) - 1
          if (a > 0) {
            breakMinutesRemainingRef.current = a;
            secondsRemainingRef.current = 60;
            setBreakLength(a.toString());
          }
          break;
        case 'session-increment':
        //  (parseInt(sessionLength) + 1 > 60)? setSessionLength('60') : setSessionLength((prevState) => (parseInt(prevState)+1).toLocaleString())
        a = parseInt(sessionLength) + 1
        if (a < 61) {
          sessionMinutesRemainingRef.current = a;
          secondsRemainingRef.current = 60;
          setSessionLength(a.toString());
        } 
        break;
        case 'session-decrement':
          // (parseInt(sessionLength) - 1 < 1)? setSessionLength('1') : setSessionLength((prevState) => (parseInt(prevState)-1).toLocaleString())
          a = parseInt(sessionLength) - 1
          if (a > 0) {
            sessionMinutesRemainingRef.current = a;
            secondsRemainingRef.current = 60;
            setSessionLength(a.toString());
          }
          break;
        }
      if (isBreakTime==true) {        
        setDisplayMinutes(breakMinutesRemainingRef.current);
      } else {
        setDisplayMinutes(sessionMinutesRemainingRef.current);
      }
      setDisplaySeconds('00');
      }
    }
  
    function reset() {
      setTimer(false);
      setBreak(false); 
      setType('Study Time')
      setBreakLength('5');
      setSessionLength('25');
      setDisplayMinutes('25');
      setDisplaySeconds('00');
      breakMinutesRemainingRef.current = '5';
      sessionMinutesRemainingRef.current = '25';
      secondsRemainingRef.current = 60;
    }
    
    
  

  return (
    <div id="clockBody">
      <div>25 + 5 Clock</div>
      <div>(Study Timer)</div>

      <div className="timeSetting">
        <div className="setSessionBreak">
          <p id='break-label'>Break Time</p>
          <button id="break-increment" onClick={changeLength}>u</button>
          <button id="break-decrement" onClick={changeLength}>d</button>
          <div className="" ><span id="break-length">{breakLength}</span>:00</div>
        </div>
        <div className="setSessionBreak">
          <p id='session-label'>Session Length</p>
          <button id="session-increment" onClick={changeLength}>u</button>
          <button id="session-decrement" onClick={changeLength}>d</button>
          <div className=""><span id="session-length">{sessionLength}</span>:00</div>
        </div>
      </div>
      <div className="timer debug2" id="timer-label">Session: {type}</div>
      <div className="remainingTime">
        <p className="debug">Remaining Time</p>
        <div className="debug" id="time-left">{minutesDisplay}:{secondsDisplay}</div>
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        <div className='controls'>
          <button id="start_stop" onClick= {()=>setTimer(!timerOn)}>Pause/Start</button>
          <button id="reset" onClick={reset}>Reset</button>
        </div>
      </div>
      
    </div>
  )
}

export default App


