import { useState, useEffect, useRef } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css'
import Modal from "react-modal";
import MyModal from './MyModal';

function App() {
  
  const [defaultTimesLength, setDefaultTimesLength] = useState([25 * 60, 5 * 60, 15 * 60]);
  const [pomodoro, setPomodoro] = useState(0);
  const [pomodoroTimer, setPomodoroTimer] = useState(25 * 60);
  const [shortBreak, setShortBreak] = useState(5 * 60);
  const [longBreak, setLongBreak] = useState( 15 * 60);
  const [isPaused, setIsPaused] = useState(true);
  const [shortBreakIsPaused, setShortBreakIsPaused] = useState(true);
  const [longBreakIsPaused, setLongBreakIsPaused] = useState(true);
  const [page, setPage] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const [fonts, setFonts] = useState([
    {fontName : 'Hanken Grotesk' , flabackFont : "sans-serif" , isSelected : true} ,
    {fontName : 'Roboto Slab' , flabackFont : "serif" , isSelected : false} ,
    {fontName : 'Space Grotesk' , flabackFont : "sans-serif" , isSelected : false}
  ]);
  const [colors, setColors] = useState([
    {colorName : "var(--Redish)" , isSelected : true} ,
    {colorName : "var(--greenish)" , isSelected : false} ,
    {colorName : "var(--violish)" , isSelected : false}
  ])
  const [shouldPlay, setShouldPlay] = useState(false);
  const audioRef = useRef(null);


  const MAXPOMO = defaultTimesLength[0] ;
  const MAXSHORT = defaultTimesLength[1];
  const MAXLONG = defaultTimesLength[2] ;
  const DEFAULTCOLOR = colors.filter(color => color.isSelected === true).map(color => color.colorName);
  const DEFAULTFONT = fonts.filter(font => font.isSelected === true).map(font => font.fontName + " , " + font.flabackFont);



  useEffect(() => {
    const body = document.querySelector('body');
    body.style.fontFamily = DEFAULTFONT[0];
  }, [fonts]);

  useEffect(() => {

      Modal.setAppElement('body');

      const pomo=JSON.parse(localStorage.getItem('pomodoroTimer'));
      const shoto=JSON.parse(localStorage.getItem('shortBreak'));
      const longo=JSON.parse(localStorage.getItem('longBreak'));
      const fonto=JSON.parse(localStorage.getItem('fonts'));
      const coloro=JSON.parse(localStorage.getItem('colors'));

      if(pomo && shoto && longo && fonto && coloro) {
        setDefaultTimesLength([pomo , shoto, longo ]);
        setPomodoroTimer(pomo);
        setShortBreak(shoto);
        setLongBreak(longo);
        setFonts(fonto);
        setColors(coloro);
      }
    
  }, []);

  useEffect(() => {
    if (pomodoroTimer === 0) {
      setShouldPlay(true);
      setIsPaused(true);
      const timeoutId = setTimeout(() => {
        setPomodoroTimer(MAXPOMO);
        if(pomodoro + 1 < 4){
          setPage('1');
          setShortBreakIsPaused(false);
        }   
        else {
          setPage('2');
          setLongBreakIsPaused(false);
        }
        setPomodoro(pom => pom + 1)
      }, 3000);
      
      return  () => {
        clearTimeout(timeoutId);
      };
    }

    const intervalId = setInterval(() => {
      if (!isPaused) {
        setPomodoroTimer((seconds) => seconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  },[pomodoroTimer, isPaused]);

  useEffect(() => {
    if (shortBreak === 0) {
      setShouldPlay(true);
      setShortBreakIsPaused(true);
      const timeoutId = setTimeout(() => {
        setShortBreak(MAXSHORT);
        setPage('0');
        setIsPaused(false);
      }, 3000);
      return  () => {
        clearTimeout(timeoutId);
      };
    }

    const intervalId = setInterval(() => {
      if (!shortBreakIsPaused) {
        setShortBreak((seconds) => seconds - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  },[shortBreak, shortBreakIsPaused]);

  useEffect(() => {
      if (longBreak === 0) {
        setShouldPlay(true);
        setLongBreakIsPaused(true);
        setPomodoro(0);
        const timeoutId = setTimeout(() => {
          setLongBreak(MAXLONG);
          setPage('0');
          setIsPaused(false);
        }, 3000);
        return () => {
          clearTimeout(timeoutId);
        };
      }

      const intervalId = setInterval(() => {
        if (!longBreakIsPaused) {
          setLongBreak((seconds) => seconds - 1);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    
  }, [longBreak, longBreakIsPaused]);

  const seconds = page === '0' ? pomodoroTimer : (page === '1' ? shortBreak : longBreak);
  const maxSeconds = page === '0' ? MAXPOMO : (page === '1' ? MAXSHORT : MAXLONG);
  const minutes = Math.floor(seconds / 60); // Extract the number of minutes
  const remainingSeconds = seconds % 60; // Extract the remaining seconds
  let time;
  if (seconds === 3600) {
    time = '60:00';
  } else {
    time = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  const percentage = Math.round((seconds / maxSeconds) * 100);

function renderTextBtn() {
  const isPausedValue = page === '0' ? isPaused : page === '1' ? shortBreakIsPaused : longBreakIsPaused;

  return isPausedValue ? 'Start' : 'Pause';
}
const handlePauseResume = () => {
  if (page === '0') {
    if (shortBreakIsPaused && longBreakIsPaused) {
      setIsPaused(!isPaused);
    } else {
      setIsPaused(false);
      setShortBreakIsPaused(true);
      setLongBreakIsPaused(true);
      setShortBreak(MAXSHORT);
      setLongBreak(MAXLONG);
    }
  } else if (page === '1') {
    if (isPaused && longBreakIsPaused) {
      setShortBreakIsPaused(!shortBreakIsPaused);
    } else {
      setShortBreakIsPaused(false);
      setIsPaused(true);
      setLongBreakIsPaused(true);
      setPomodoroTimer(MAXPOMO);
      setLongBreak(MAXLONG);
    }
  } else {
    if (isPaused && shortBreakIsPaused) {
      setLongBreakIsPaused(!longBreakIsPaused);
    } else {
      setLongBreakIsPaused(false);
      setIsPaused(true);
      setShortBreakIsPaused(true);
      setPomodoroTimer(MAXPOMO);
      setShortBreak(MAXSHORT);
    }
  }
};


  const handlePage = (event) => {
    setPage(event.target.id);
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function handleReset() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setPomodoroTimer(MAXPOMO);
    setPomodoro(0);
    setIsPaused(true);
    setShortBreak(MAXSHORT);
    setShortBreakIsPaused(true);
    setLongBreak(MAXLONG);
    setLongBreakIsPaused(true);
    setShouldPlay(false);
    setDefaultTimesLength([MAXPOMO, MAXSHORT, MAXLONG]);
    setPage('0');
  }

function applyConfigs(pomodoroTimer, shortBreak, longBreak, fonts, colors) {
  const config = {
    pomodoroTimer,
    shortBreak,
    longBreak,
    fonts,
    colors
  };
  
  for (const [key, value] of Object.entries(config)) {
    localStorage.setItem(key, JSON.stringify(value));
    switch (key) {
      case 'pomodoroTimer':
        setPomodoroTimer(value);
        setPomodoro(0);
        setIsPaused(true);
        setDefaultTimesLength([value, shortBreak, longBreak]);
        break;
      case 'shortBreak':
        setShortBreak(value);
        setShortBreakIsPaused(true);
        break;
      case 'longBreak':
        setLongBreak(value);
        setLongBreakIsPaused(true);
        break;
      case 'fonts':
        setFonts(value);
        break;
      case 'colors':
        setColors(value);
        break;
    }
  }
  
  toggleModal();
}

  const styleOfNav = {
    backgroundColor: DEFAULTCOLOR[0],
    color: "var(--Dark)",
  }

  


  useEffect(() => {
    const audioElement = audioRef.current;

    const handleAudioEnd = () => {
      setShouldPlay(false);
    };

    audioElement.addEventListener('ended', handleAudioEnd);

    return () => {
      audioElement.removeEventListener('ended', handleAudioEnd);
    };
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (shouldPlay) {
      audioElement.play();
    } else {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }, [shouldPlay]);

  
  return (
    <div className='container'>
    <audio 
      src="https://bigsoundbank.com/UPLOAD/wav/2811.wav" 
      id="beep" 
      preload="auto" 
      ref={audioRef}> 
      </audio>
    <h1 className='logo'> pomodoro</h1>
      <div className='nav_bar' id="timer-label">
        <div 
          id="0" 
          className="nav_title"
          style = {page === "0" ? styleOfNav : {}}
          onClick={handlePage}>
            pomodoro
        </div>
        <div 
          id="1" 
          className="nav_title" 
          style = {page === "1" ? styleOfNav : {}}
          onClick={handlePage}>
            short break
        </div>
        <div 
          id="2" 
          className="nav_title" 
          style = {page === "2" ? styleOfNav : {}}
          onClick={handlePage}>
            long break
        </div>
      </div>
      <div className='small_container'>
        <div className='clock_container' onClick={handlePauseResume} id="start_stop">
          <div className='circle'>
            <CircularProgressbar 
              className='progress_bar'
              value={percentage} 
              strokeWidth={4}
              styles={buildStyles({
                pathColor: DEFAULTCOLOR[0],
                trailColor: "transparent"
                })} />
          </div>
          <div className='clock' id="time-left" >
            {time}
          </div>
          <p className='pause'>{renderTextBtn()}</p>
        </div>
      </div>
      <div className='buttons'>
        <button type='button' className='configsBtn' onClick={toggleModal}> <i className="fa fa-cog" ></i></button>
        <button type='button' id="reset" className='resetBtn' onClick={handleReset}> <i className="fa fa-refresh" ></i></button>
      </div>
      
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="Settings"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <MyModal 
          toggleModal={toggleModal}
          pomo={MAXPOMO}
          short={MAXSHORT} 
          long={MAXLONG} 
          fonts={fonts} 
          colors={colors}
          applyConfigs={applyConfigs} />
      </Modal>
    </div>
  )
}

export default App
