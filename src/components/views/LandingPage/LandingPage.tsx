import React from 'react';
import './LandingPage.css'
import { Link } from "react-router-dom";

function LandingPage() {
  return (
      <main>
        <h1>Demo game</h1>
        <div className="list-row">
          <Link to="/game1" className='text'>
            Game 1: Đếm đến 5
          </Link>
        </div>
        <div className='list-row'>
          <Link to="/game2" className='text'>
            Game 2: Đếm đến 5 trong khung
          </Link>
        </div>
        <div className='list-row'>
          <Link to="/game3" className='text'>
            Game 3: Test
          </Link>
        </div>
        <div className='list-row'>
          <Link to="/game4" className='text'>
            Game 4: Nhà cho con vật
          </Link>
        </div>
        <div className='list-row'>
          <Link to="/game5" className='text'>
            Game 5: Sên ăn lá
          </Link>
        </div>
        <div className='list-row'>
          <Link to="/game6" className='text'>
            Game 6: Xếp tủ lạnh
          </Link>
        </div>
        <div className='list-row'>
          <Link to="/game7" className='text'>
            Game 7: Tìm đường
          </Link>
        </div>
      </main>
  )
}

export default LandingPage
