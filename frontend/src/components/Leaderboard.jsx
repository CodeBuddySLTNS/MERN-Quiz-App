import './css/Leaderboard.css';
import leaderboardImg from '../assets/leaderboard.png';
import Axios from 'axios';
import { APIs } from '../config/api';
import { useEffect, useState } from 'react';
import chickenLoader from '../assets/chickenLoader.gif';
import RankPlayers from './RankPlayers';
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';


const Leaderboard = () => {
  const [players, setPlayers] = useState({fetching: true, data: []});
  
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${APIs.baseUrl}/api/leaderboardData`)
      .then(res => {
        setPlayers({fetching: false, data: res.data.response});
      })
  },[])
  
  return(
    <div className="leaderboardContainer">
      <div></div>
      <div className="leaderboardSubCon">
        <div className="leaderboard">
          <div className="leadImage">
            <img src={leaderboardImg} />
          </div>
          <div className="leaderboardContents">
            <h1>Top Scorers</h1>
            <div className="rankColums">
              <li>Player</li>
              <li>Points</li>
            </div>
            <div className="playersRank">
              { players.fetching ? 
                <div className="fetchingLeaderboard">
                  <p>fetching data...</p>
                </div> :
                <RankPlayers players={players.data} />
              }
            </div>
            <p className="rankTip">
              <span>Tip:</span>&nbsp;
              Click the player to view details.
            </p>
            <div className="backToHome">
              <button className="leaderboardHomeBtn" onClick={() => navigate(-1)}>
                <TiArrowBack />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard;