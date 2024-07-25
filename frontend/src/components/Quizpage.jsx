import './css/Quizpage.css';
import { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../App';
import { ShowResults } from './ShowResults';
import Prompt from './Prompt';
import { roundedNumberTwoDecimals } from './functions/roundedNumberTwoDecimals';
import { shuffleArray } from './functions/shuffleArray';
import { decoderString } from './functions/decoderString';
import axios from 'axios';
import chickenLoader from '../assets/chickenLoader.gif';
import { APIs } from '../config/api';

const Quizpage = () => {
  const {
    apiUrl,
    questions, setQuestions, 
    quizDifficulty, setQuizDifficulty,
    playerLevel, setPlayerLevel,
    playerPoints, setPlayerPoints,
    playerAccuracy, setPlayerAccuracy,
  } = useContext(AppContext);
  
  const letters = ["A.", "B.", "C.", "D.", "E.", "F.", "G."];
  
  const [isFetching, setIsFetching] = useState(true);
  
  const [promptQuit, setPrompQuit] = useState(false);
  
  const [decodedQuestion, setDecodedQuestion] = useState("decodedQuestion");
  const [answer, setAnswer] = useState("answer");
  const [choices, setChoices] = useState(["choices"]);
  const [questionCount, setQuestionCount] = useState(0);
  const [num, setNum] = useState(0);
  const [nextStatus, setNextStatus] = useState({status: "disabled", label: "Next"});
  const [correctButton, setCorrectButton] = useState(-1);
  const [checkButtons, setCheckButtons] = useState("");
  const [score, setScore] = useState(0);
  const [isQuizDone, setIsQuizDone] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const choicesRef = [useRef(), useRef(), useRef(), useRef()]
  
  const nextQuestion = () => {
    if (questionCount >= questions.length) {
      const initialPoints = roundedNumberTwoDecimals((score / questions.length) * 100);
      
      const officialPoints = roundedNumberTwoDecimals((initialPoints/2) * (quizDifficulty == "Easy" ? 1.3 : quizDifficulty == "Medium" ? 1.5 : quizDifficulty == "Hard" ? 1.8 : 1.5));
      
      setPlayerPoints(roundedNumberTwoDecimals(playerPoints + officialPoints));
      
      setPlayerAccuracy(playerAccuracy == 0 ? initialPoints : roundedNumberTwoDecimals((playerAccuracy + initialPoints)/2));
      
      setIsQuizDone({status: true, officialPoints: officialPoints, accuracy: initialPoints});
      return;
    }
    try {
      displayQnChoices();
      setNextStatus({status: "disabled", label: "Next"});
    } catch (e) {alert(e)}
  }
  
  function displayQnChoices(){
    setDecodedQuestion(decoderString(questions[questionCount].question));
    setAnswer(decoderString(questions[questionCount].correct_answer));
    setChoices(shuffleArray([...questions[questionCount].incorrect_answers, questions[questionCount].correct_answer]));
    setDifficulty(questions[questionCount].difficulty);
    setNum(questionCount + 1)
  }
  
  function checkAnswer(event, id){
    if(event.target.innerText.slice(3) == answer){
      setCheckButtons({btnId: id, isCorrect: true});
      setCorrectButton(-1);
      setScore(score + 1);
    }else{
      setCheckButtons({btnId: id, isCorrect: false})
      setCorrectButton(-1)
    }
      try {
        choicesRef.map((choice, i) => {
          if(choice.current.innerText.slice(3) == answer){
            setTimeout(function() {setCorrectButton(i)}, 500);
            return
          }
        })
      } catch (e) {alert(e)}
    if(num == 15){
      setNextStatus({status: "", label: "Results"})
    }else{
      setNextStatus({status: "", label: "Next"});
    }
    
    setQuestionCount(questionCount + 1);
  }
  
  
  
  //  fetch questions
  useEffect(() => {
    async function getQuestions(){
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
      
      try {
        axios(url).then( response => {
          setQuestions(response?.data?.results);
          setIsFetching(false)
        })
      } catch (e) {alert(e)}
    }
    getQuestions()
  },[])
  
  // updates the database everytime playerPoints changes
  useEffect(() => {
    axios.get(`${APIs.baseUrl}/api/updatePlayerData?player=${localStorage.getItem('player')}&points=${playerPoints}&accuracy=${playerAccuracy}`)
      .then(response => {
        const player = response.data.response;
        if (player != "not found") {
          setPlayerLevel(player.level);
        }
      })
      .catch(err => console.log(err))
  },[playerPoints])
  
  // if the questions was successfully fetch from server then it will be displayed.
  useEffect(() => {
    if(questions){
      try {
        displayQnChoices();
        setNextStatus({status: "disabled", label: "Next"});
      } catch (e) {alert(e)}
    }
  },[questions])
  
  return(
    isFetching ? <p className="loadingSpinner"><img src={chickenLoader} />Loading...</p> : <>
      <div className="QuizpageContainer">
        <div className="quizStatus">
          <div className="quizStatusDifficulty">
            Difficulty: {difficulty.toLowerCase()}
          </div>
          <div className="quizStatusScore">
            score: {score} / {questions.length}
          </div>
        </div>
        <div className="Quizpage">
          <div className="question">{num}. {decodedQuestion}</div>
          <div className="choices">
            {choices.map((choice, id) => (
                <button 
                  className={`choice ${nextStatus.status == "disabled" ? "transparent" : checkButtons.btnId != id ? "transparent" : checkButtons.isCorrect ? "correct" : "wrong"}`} 
                  style={{background: nextStatus.status == "disabled" ? "#f0f0f0" : correctButton < 0 ? "" : correctButton == id ? "lightgreen" : "rgba(255,12,12,0.3)"}}
                  ref={choicesRef[id]} 
                  key={id} 
                  onClick={(event) => checkAnswer(event, id)}
                  disabled={nextStatus.status == "disabled" ? "" : "disabled"}
                >{letters[id]} {decoderString(choice)}</button>
              ))}
          </div>
          <div className="quizBtns">
            <button className="quitBtn" onClick={() => setPrompQuit(true)}>Quit</button>
            <button className="nextBtn" onClick={nextQuestion} disabled={nextStatus.status}>{nextStatus?.label}</button>
          </div>
        </div>
      </div>
      {promptQuit &&
        <Prompt cancel={setPrompQuit} />
      }
      { isQuizDone.status &&  
        <ShowResults 
          setIsFetching={setIsFetching}
          score={score}
          setScore={setScore}
          setQuestionCount={setQuestionCount}
          isQuizDone={isQuizDone}
          setIsQuizDone={setIsQuizDone}
        /> }
    </>
  )
}

export default Quizpage;