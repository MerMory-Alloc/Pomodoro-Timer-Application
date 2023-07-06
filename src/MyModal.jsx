import { useState } from 'react';
import './Modal.css';

export default function MyModal(props){

    const [pomodoro, setPomodoro] = useState(props.pomo);
    const [shortBreak, setShortBreak] = useState(props.short);
    const [longBreak, setLongBreak] = useState(props.long);
    const [fonts, setFonts] = useState(props.fonts);
    const [colors, setColors] = useState(props.colors);


    function handleInput(event) {
      const { id, value } = event.target;
      let seconds = value * 60;

      seconds = Math.max(60, Math.min(3600, seconds));
    
      switch (id) {
        case 'session-length':
          setPomodoro(seconds);
          break;
        case 'break-length':
          setShortBreak(seconds);
          break;
        case 'longBreakMins':
          setLongBreak(seconds);
          break;
        default:
          break;
      }
    }

    function handleFontRadioChange(event) {
      const {id, checked} = event.target;
      let fstmp=[];

      if(checked){
        fstmp = fonts.map((font , i) => {
          if(id == i) 
            return {...font, isSelected : true};
          else 
            return {...font, isSelected : false};
        });
        setFonts(fstmp);
      } 
    }

    function handleColorRadioChange(event) {
      const {id, checked} = event.target;
      let fstmp=[];

      if(checked){
        fstmp = colors.map((color , i) => {
          if(id == i) 
            return {...color, isSelected : true};
          else 
            return {...color, isSelected : false};
        });
        setColors(fstmp);
      }
    }
    
    function handleApplyBtn() {
      props.applyConfigs(pomodoro, shortBreak, longBreak, fonts, colors);
    }    

    const incrementValue = (event) => {
      const { id } = event.target.parentElement;
      console.log(id)
      switch (id) {
        case 'session-increment':
          if(pomodoro < 3600)
            setPomodoro((prevPomodoro) => prevPomodoro + 60);
          break;
        case 'break-increment':
          if(shortBreak < 3600)
            setShortBreak((prevShort) => prevShort + 60);
          break;
        case 'long-increment':
          if(longBreak < 3600)
            setLongBreak((prevLong) => prevLong + 60);
          break;
        default:
          break;
      }
    };
  
    const decrementValue = (event) => {
      const { id } = event.target.parentElement;
      switch (id) {
        case 'session-decrement':
          if(pomodoro > 60)
            setPomodoro((prevPomodoro) => prevPomodoro - 60);
          break;
        case 'break-decrement':
          if(shortBreak > 60)
            setShortBreak((prevShort) => prevShort - 60);
          break;
        case 'long-decrement':
          if(longBreak > 60)
            setLongBreak((prevLong) => prevLong - 60);
          break;
        default:
          break;
      }
    };


    return(
        <>
        <div className='modal_title'>
          <h3>Settings</h3>
          <button onClick={props.toggleModal} type='button'><i className="fa fa-times" ></i></button>
        </div>
        <div className='modal_content'>
          <div className='timInMinCont'>
            <h4>Time (Minutes)</h4>
            <div className='timesInmin'>
              <label className="Mins" htmlFor="session-length" id="session-label">pomodoro 
                <div className="input-wrapper">
                  <input type="number" id="session-length" min="1" max="60" value={pomodoro / 60} onChange={handleInput} />
                  <div className="button-wrapper">
                    <button className="increment-button" id="session-increment" onClick={incrementValue}><i className="fa fa-angle-up"></i></button>
                    <button className="decrement-button" id="session-decrement" onClick={decrementValue}><i className="fa fa-angle-down"></i></button>
                  </div>
                </div>
              </label>
              <label className="Mins" htmlFor="break-length" id="break-label">short break 
                <div className="input-wrapper">
                  <input type='number'  id="break-length" min={1} max={60} value={shortBreak / 60} onChange={handleInput} />
                  <div className="button-wrapper">
                    <button className="increment-button" id="break-increment" onClick={incrementValue}><i className="fa fa-angle-up"></i></button>
                    <button className="decrement-button" id="break-decrement" onClick={decrementValue}><i className="fa fa-angle-down"></i></button>
                  </div>
                </div>
              </label>
              <label className="Mins" htmlFor="longBreakMins">long break 
                <div className="input-wrapper">
                  <input type='number' id='longBreakMins' min={1} max={60} value={longBreak / 60} onChange={handleInput} />
                  <div className="button-wrapper">
                    <button className="increment-button" id='long-increment' onClick={incrementValue}><i className="fa fa-angle-up"></i></button>
                    <button className="decrement-button" id="long-decrement" onClick={decrementValue}><i className="fa fa-angle-down"></i></button>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div className=' fav_setting_container'> 
            <h4>Font</h4>
            <div className='fonts'>

              {fonts.map((font, index) => {
                return (
                    <input 
                    key={index} 
                    type="radio" 
                    id={index}
                    name="fav_font" 
                    value={font.fontName}
                    style={{fontFamily : font.fontName + " , " + font.flabackFont}}
                    checked = {font.isSelected} 
                    onChange={handleFontRadioChange}/>
                )
              })}
              
              
            </div>
          </div>
          <div className=' fav_setting_container'> 
            <h4>Color</h4>
            <div className='colors'>

              {colors.map((color, index) => {
                return (
                    <input 
                    key={index} 
                    type="radio" 
                    id={index}
                    name="fav_color" 
                    value={color.colorName}
                    style={{backgroundColor : color.colorName}}
                    checked = {color.isSelected}
                    onChange={handleColorRadioChange}/>
                )
              })}
              
            </div>
          </div>
        </div>

        <button onClick={handleApplyBtn} type='button' className='acceptBtn'>Apply</button>
        </>
    )
}