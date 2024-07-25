import './css/Header.css';
import bords from '../assets/bords.png';
import boxbg from '../assets/boxbg.png';
import { AppContext } from '../App';
import { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { playerName, playerLevel, playerPoints } = useContext(AppContext);
  
  return(
    <div className="Header">
      <div className="user">
        <div className="userLevel">
          <img src={bords} />
          <div className="userLevelValue">{playerLevel}</div>
        </div>
        <div className="userInfo">
          <img src={boxbg} />
          <div className="userInfoValue">
            <p className="userName">{playerName}</p>
            <hr />
            <p className="userPoints">{playerPoints} <em>points</em></p>
          </div>
        </div>
      </div>
      <div className="leaderboardBtnContainer">
        <Link to="/leaderboard">
          <div className="leaderboardBtn"></div>
        </Link>
      </div>
      
    </div>
  )
}

export default Header;