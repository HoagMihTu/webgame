import React from 'react';
import { medalAll, bg_popupAll, bannerAll, greencheckAll, redxAll, giftAll} from './img.js'
import { useNavigate } from "react-router-dom";

function PopUp(props) {
    const { setPopUp, point, title, correct, newGame} = props 
    let navigate = useNavigate(); 
    return (
        <div className="PopUp">
            {point >= 90 
            ?
            <div className='PopUp1-container'>
                <img src={medalAll}  className='PopUp1-img'/>
                <div className="PopUp1-content-container">
                    <p className='PopUp1-content-title'>HUY CHƯƠNG</p>
                    <p className='PopUp1-content-text'>Chúc mừng bé đã nhận được món quà nhé!</p>
                </div>
                <div className='PopUp1-btn-container'>
                    <button className='PopUp1-btn' onClick={() => {()=> setPopUp(false);navigate('/')}}>Học tiếp</button>
                </div>
            </div>
            :
            <div className='PopUp2-container' style={{backgroundImage: `url(${bg_popupAll})`,backgroundSize: 'cover'}}>
                <img src={bannerAll}  className='PopUp2-img'/>
                <div className='PopUp2-point-container'>
                    <span className='PopUp2-point'>{point}</span>
                    <span className='PopUp2-point-max'>/100 điểm</span>
                </div>
                <div className="PopUp2-content-container">
                    <p className='PopUp2-content-text1'>Bé chưa đạt điểm tối đa của bài </p>
                    <p className='PopUp2-content-title'>"{title}"</p>
                </div>
                <div className='PopUp2-result-container'>
                    <div className='PopUp2-detail-container'>
                        <img src={greencheckAll} className='PopUp2-detail-img'/>
                        <span className='PopUp2-true'>{correct}</span>
                    </div>
                    <div className='PopUp2-detail-container'>
                        <img src={redxAll} className='PopUp2-detail-img'/>
                        <span className='PopUp2-false'>{12-correct}</span>
                    </div>
                </div> 
                <div className="PopUp2-content-container">
                    <span className='PopUp2-content-text2'>Làm lại</span> 
                    <span className='PopUp2-content-text1'> và hoàn thành tất cả các câu hỏi để nhận được</span>
                    <img src={giftAll} className='PopUp2-content-img'/>
                    <span className='PopUp2-content-text3'> phần quà bí mật</span>
                    <span className='PopUp2-content-text1'> nha</span>
                </div>
                <div className='PopUp2-btn-container'>
                    <button className='PopUp2-btn1' onClick={() => {()=> setPopUp(false);navigate('/')}}>Học tiếp</button>
                    <button className='PopUp2-btn2' onClick={() => {newGame()}}>Làm lại</button>
                </div>
            </div>
            }
          </div>
      );
  }

export default PopUp