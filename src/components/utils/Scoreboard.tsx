import React from "react"
import { formatTime } from "./formatTime"
import { starAll, gray_starAll } from "./img.js"

function Scoreboard(timer, isPaused, point, correct, questions) {
    const styles = {
        backgroundColor: isPaused ? "blue" : "red"
    }
  return (
    <div className="scoreboard-container">
        <div className="scoreboard-header" style={styles}>
            <p className="scoreboard-header-text">{formatTime(timer)}</p>
        </div>
        <div className="scoreboard-items">
            <div className="scoreboard-left">
                <div className="scoreboard-dot1"></div>
                <div className="scoreboard-name">Điểm</div>
            </div>
            <div className="scoreboard-right1">{point}</div>
        </div>
        <div className="scoreboard-items">
            <div className="scoreboard-left">
                <div className="scoreboard-dot2"></div>
                <div className="scoreboard-name">Số câu trả lời</div>
            </div>
            <div className="scoreboard-right2">{correct}</div>
        </div>
        <div className="scoreboard-items">
            <div className="scoreboard-left">
                <div className="scoreboard-dot3"></div>
                <div className="scoreboard-name">Số câu còn lại</div>
            </div>
            <div className="scoreboard-right3">{questions}</div>
        </div>
        <div className="scoreboard-star-container">
            {point>30 ? <img src={starAll} className="scoreboard-star1"/> : <img src={gray_starAll} className="scoreboard-star1"/>}
            {point>60 ? <img src={starAll} className="scoreboard-star2"/> : <img src={gray_starAll} className="scoreboard-star2"/>}
            {point>90 ? <img src={starAll} className="scoreboard-star3"/> : <img src={gray_starAll} className="scoreboard-star3"/>}
        </div>
    </div>
  )
}

export default Scoreboard