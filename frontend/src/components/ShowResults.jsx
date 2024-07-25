import { IoMdTrophy } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";
import { AppContext } from '../App';
import { useContext, useState } from 'react';
import { roundedNumberTwoDecimals } from './functions/roundedNumberTwoDecimals';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export const ShowResults = (props) => {
  const navigate = useNavigate();
  
  const { 
    roundedNumberTwoDecimals,
    questions, setQuestions, quizDifficulty, isLoAding, setIsLoAding, apiUrl, setApiUrl
  } = useContext(AppContext);
  
  const playAgain = async () => {
    props.setIsFetching(true);
    props.setScore(0);
    props.setQuestionCount(0);
    props.setIsQuizDone({status: false, officialPoints: 0, accuracy: 0});
    
    let url;
    switch (quizDifficulty) {
      case 'Easy':
        url = await apiUrl.easy;
        break;
      case 'Medium':
        url = await apiUrl.medium;
        break;
      case 'Hard':
        url = await apiUrl.hard;
        break;
      case 'Random':
        url = await apiUrl.random;
        break;
      case 'Dev':
        url = await apiUrl.dev;
        break;
      default:
        url = await apiUrl.easy
    }
    
    await axios(url).then( response => {
        setQuestions(response?.data?.results);
        props.setIsFetching(false);
      }).catch((e) => alert(` EEEEEEYYYYY:  ${e}`))
  }
  
  return(
    <div className="resultsContainer">
      <div className="results">
        <h2>Results</h2>
        <div className="score">
          <p>Score:</p>
          <p className="resultScoreValue">{props.score} / {questions.length}</p>
        </div>
        <div className="resultPoints">
          <p>Points:</p>
          <p className="resultPointsValue">
            {
              `${props.isQuizDone?.officialPoints}`.split(".")[1] == "00" ? `${props.isQuizDone}`.split(".")[0] : props.isQuizDone?.officialPoints
            }
          </p>
        </div>
        <div className="resultAccurcy">
          <p>Accuracy:</p>
          <p className="resultAcurracyValue">{`${props.isQuizDone?.accuracy}`.split(".")[1] == "00" ? `${props.isQuizDone?.accuracy}`.split(".")[0] : props.isQuizDone?.accuracy}%</p>
        </div>
        <div className="resultDifficulty">
          <p>Difficulty:</p>
          <p className="resultDifficultyValue">{quizDifficulty}</p>
        </div>
        <div className="resultBtns">
          <button className="resultHomeBtn" onClick={() => navigate('/', {replace: true})}>
            <IoHomeSharp />
          </button>
          <button className="resultLeaderboardBtn" onClick={() => navigate('/leaderboard', {replace: true})}>
            <IoMdTrophy />
          </button>
          <button className="resultPlayAgainBtn" onClick={playAgain}>
            <FaArrowsRotate />
          </button>
        </div>
      </div>
    </div>
  )
}