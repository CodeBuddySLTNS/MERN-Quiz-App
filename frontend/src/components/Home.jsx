import './css/Home.css';
import playbtn from '../assets/play.png';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import NewPlayer from './NewPlayer';


const Home = () => {
  const { difficulty, quizDifficulty, setQuizDifficulty, questions, setQuestions, apiUrl, setApiUrl, isLoAding, setIsLoAding } = useContext(AppContext);
  
  const [ difficultyToggled, setDifficultyToggled ] = useState(false);
  const [disPlay, setDisPlay] = useState(false);
  
  const changeDifficulty = (event) => {
    setQuizDifficulty(event.target.innerText);
    setTimeout(function() {setDifficultyToggled(!difficultyToggled)}, 1);
    setDisPlay(!disPlay);
  }
  
  // const { isLoading, data} = useQuery({
  //   queryKey: ['quiz'],
  //   queryFn: () => {
  //     return axios(apiUrl.dev).then( response => {
  //       return response.data;
  //     })
  //   },
  // });
  
  return(
    <>
      {!isLoAding.found && <NewPlayer />}
      <div className="Home">
        <h2>Technology<br />Quizzz</h2>
        <div className="difficulty">
          <p className="difficultySelected"onClick={changeDifficulty}>{quizDifficulty}</p>
          <div className="difficultyToggle" style={{display: disPlay ? "block" : "none", height: difficultyToggled ? "145px" : "0"}}>
            <p onClick={changeDifficulty}>Easy</p>
            <p onClick={changeDifficulty}>Medium</p>
            <p onClick={changeDifficulty}>Hard</p>
            <p onClick={changeDifficulty}>Random</p>
          </div>
        </div>
        <Link to="/quizpage">
          <div className="play">
            <button className="playBtn" type="button">
              <img src={playbtn} />
            </button>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Home;