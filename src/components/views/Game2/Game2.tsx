import React, { useState } from 'react'
import './Game2.css'
import Scoreboard from '../../utils/scoreboard'
import { bg_game2, tutorial2} from './img/img.jsx'
import {trueimgAll, wrongimgAll} from '../../utils/img.jsx'
import lightbulb from '../../../assets/light-bulb.png'
import Quiz from './img/Quiz'
import useTimer from '../../utils/useTimer'
import PopUp from '../../utils/popUp'
import {nanoid} from "nanoid"

function Game2() {
  const [gameState, setGameState] = useState('Idle')
  const [correct, setCorrect] = useState(0)
  const [questions, setQuestions] = useState(12)
  const [isChosen, setIsChosen] = useState(true)
  const [valueChosen, setValueChosen] = useState(0)
  const [buttonChosen, setButtonChosen] = useState('')
  const [buttonPrevChosen, setButtonPrevChosen] = useState('button1')
  const [randomValue, setRandomValue] = useState(0)
  const [randomItem, setRandomItem] = useState(0)
  const [point, setPoint] = useState(0)
  const { timer, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0)
  const [box, setBox] = useState([])

  const [popUp, setPopUp] = useState(false)
  const duringPopUp = popUp ? " during-popup" : ""

  const newGame = () =>{
    setGameState('Idle');
    setCorrect(0);
    setQuestions(12);
    setButtonChosen('');
    setIsChosen(true);
    setPoint(0)
    handleReset();
    setPopUp(false)
  } 

  const getRandomInt = (min: any, max: any) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

    function generateNewBox() {
          return {
              id: nanoid()
          }
      }

    function allNewBox() {
        const newBox = []
        for (let i = 0; i < 10; i++) {
            newBox.push(generateNewBox())
        }
        return newBox
    }

  const nextRound = () =>{
    setButtonChosen('');
    setIsChosen(true)
    if(questions>0){
      setGameState('Game');
      setRandomValue(getRandomInt(1,5));
      setRandomItem(getRandomInt(0,12));
      handleResume();
    } else {
      setPopUp(true)
    }
  }

  const newRound = (value: any, item: any) =>{
    setRandomValue(value);
    setRandomItem(item);
  }

  const sendAswer = () => {
    setButtonChosen('');
    handlePause();
    setQuestions(questions - 1)
    if (valueChosen == randomValue){
      setGameState('TrueAnswer')
      setCorrect(correct+1)
      if(questions<5){
        setPoint(point+5)
      } else {
        setPoint(point+10)
      }
    } else {
      setGameState('WrongAnswer')
    }
  }

  if (buttonChosen != ''){
    if(buttonPrevChosen != buttonChosen){
      const btnPrev = document.getElementById(buttonPrevChosen);
      btnPrev!.style.backgroundColor = '#3399ff';
      setButtonPrevChosen(buttonChosen)
    } else {
      const btn = document.getElementById(buttonChosen);
      btn!.style.backgroundColor = '#ffcc33';
    }
  }

  const renderGame = () => {
    switch(gameState){
      case 'Idle': {
        return (
          <div className='gameplay-container-2'>
            <div className='img-game-background-2'>
              <img src={bg_game2} alt="bg_game2" className='img-container-2'/>
            </div>
            <div className='button-group'>
              <button className='button-game-on' onClick={() => { setGameState('Game'); newRound(getRandomInt(1,5),getRandomInt(0,13));  handleStart(); setBox(allNewBox())}}>Bắt đầu</button>
              <button className='button-tutorial' onClick={() => { setGameState('Tutorial')}}>?</button>
            </div>
          </div>
        )
      }

      case 'Tutorial': {
        return (
          <div className='gameplay-container-2'>
            <div className='img-tutorial-background-2'>
              <div className='tutorial-description-2'>
                Hướng dẫn<img src={lightbulb} className='img-lightbulb-2'/> dành cho bé nè
              </div>
              <div className='img-tutorial-2'>
                <img src={tutorial2} className='img-tutorial-container-2'/>
              </div>
              <div className='button-group2-2'>
                <button className='button-game-on' onClick={() => { setGameState('Idle'); }}>Bắt đầu</button>
              </div>
            </div>
          </div>
        )
      }
      case 'TrueAnswer':{
        setTimeout(nextRound, 2000);
        return(
          <div className='gameplay-container-2'>
            <img src={trueimgAll} className='img-screen-2'/>
          </div>
        )
      }

      case 'WrongAnswer':{
        return(
          <div className='gameplay-container-2'>
            <div className='wrong-description-container-2'>
              <div className='wrong-description-2'>
                <div className='wrong-img-container-2'>
                  <img src={wrongimgAll} className='wrong-img-2'/>
                </div>
                <div className='wrong-title-2'><strong>Huhu! Sai rồi</strong><br/>Đáp án đúng là như thế này nhé!</div>
              </div>
              <div className='wrong-makeup-container-2'>
                <div className='wrong-makeup-2'>
                  <div className='wrong-makeup-screen-2'>
                  <div className='gameplay-wrong-description-2'>Đếm số chấm tròn có trong khung và chọn câu trả lời đúng</div>
                    <div className='gameplay-wrong-description-2'>{Quiz(box,randomValue,randomItem,isPaused)}</div>
                    <hr className='hr-2'></hr>
                    <div className='gameplay-wrong-description-2'>Có bao nhiêu chấm tròn?</div>
                    <div className='button-answer-container-2'>
                      <div className='button-answer-group-2'>
                        <div className='button-answer-2'>
                          {randomValue == 1 ? <button className='button-true-2'>1</button> : <button className='button-choose-2'>1</button>}
                          {randomValue == 2 ? <button className='button-true-2'>2</button> : <button className='button-choose-2'>2</button>}
                          {randomValue == 3 ? <button className='button-true-2'>3</button> : <button className='button-choose-2'>3</button>}
                          {randomValue == 4 ? <button className='button-true-2'>4</button> : <button className='button-choose-2'>4</button>}
                          {randomValue == 5 ? <button className='button-true-2'>5</button> : <button className='button-choose-2'>5</button>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='button-group3-2'>
                <button className='button-game-on' onClick={() => { nextRound() }}>Bé đã hiểu!</button>
              </div>
            </div>
          </div>
        )
      }

      case 'Game': {
        return (
          <div className='gameplay-container-2'>
            <div className='gameplay-description-2'>Đếm số chấm tròn có trong khung và chọn câu trả lời đúng</div>
            <div className='gameplay-show-container-2'>{Quiz(box,randomValue,randomItem,isPaused)}</div>
            <hr className='hr-2'></hr>
            <div className='gameplay-description-2'>Có bao nhiêu chấm tròn?</div>
            <div className='button-answer-container-2'>
              <div className='button-answer-group-2'>
                <div className='button-answer-2'>
                  <button id="button1" className='button-choose-2' onClick={() => { setButtonChosen('button1') ,setIsChosen(false), setValueChosen(1)}}>1</button>
                  <button id="button2" className='button-choose-2' onClick={() => { setButtonChosen('button2') ,setIsChosen(false), setValueChosen(2)}}>2</button>
                  <button id="button3" className='button-choose-2' onClick={() => { setButtonChosen('button3') ,setIsChosen(false), setValueChosen(3)}}>3</button>
                  <button id="button4" className='button-choose-2' onClick={() => { setButtonChosen('button4') ,setIsChosen(false), setValueChosen(4)}}>4</button>
                  <button id="button5" className='button-choose-2' onClick={() => { setButtonChosen('button5') ,setIsChosen(false), setValueChosen(5)}}>5</button>
                </div>
              </div>
            </div>
            <div className='button-group2-2'>
                <button className='button-send-answer' disabled={isChosen} onClick={() => { sendAswer() }}>Gửi đáp án</button>
              </div>
          </div>
        )
      }
    }
  }
  return (
    <div>
      <main className={duringPopUp}>
        <div className='game-container'>
          {renderGame()}
          {Scoreboard( timer, isPaused, point, correct, questions)}
        </div>
      </main>
      {popUp && <PopUp setPopUp={setPopUp} point={point} title ='Đếm đến 5' correct={correct} newGame={newGame}/>}
    </div>
  )
}

export default Game2
