import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Quizpage from './components/Quizpage';
import Leaderboard from './components/Leaderboard';
import Axios from 'axios';
import chickenLoader from './assets/chickenLoader.gif';
import { APIs } from './config/api';


export const AppContext = createContext();

function App() {
  const [apiUrl, setApiUrl] = useState(APIs.quizDifficulty);
  const [isLoAding, setIsLoAding] = useState({status: true, found: false});
  
  const [playerName, setPlayerName] = useState('CodeBuddy');
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [playerAccuracy, setPlayerAccuracy] = useState(0);
  
  const [quizDifficulty, setQuizDifficulty] = useState("Random");
  const [questions, setQuestions] = useState(null);
  
  // fetch player data when site loads for the first time
  useEffect(() => {
    if (localStorage.getItem('player') == null) {
      localStorage.setItem('player', "new player")
    }
    // localStorage.removeItem('player')
    try {
      Axios.get(`${APIs.baseUrl}/api/fetchPlayerData?player=${localStorage.getItem('player')}`)
        .then(response => {
          const player = response.data.response;
          if (player == 'not found') {
            setIsLoAding({status: false, found: false});
          }else{
            setPlayerName(player.name);
            setPlayerLevel(player.level);
            setPlayerPoints(player.points);
            setPlayerAccuracy(player.accuracy);
            setTimeout(function() {
              setIsLoAding({status: false, found: true});
            }, 400);
          }
        })
        .catch(err => "Connection Timeout.")
    } catch (e) {console.log(e)}
  },[])
  
  if(isLoAding.status){
    return(
      <p className="loadingSpinner"><img src={chickenLoader} />Loading...</p>
    )
  }

  return (
    <div className="App">
      <Router>
        <AppContext.Provider value={{
          isLoAding, setIsLoAding,
          quizDifficulty, setQuizDifficulty,
          apiUrl, setApiUrl,  
          questions, setQuestions,
          playerName, setPlayerName,
          playerLevel, setPlayerLevel,
          playerPoints, setPlayerPoints,
          playerAccuracy, setPlayerAccuracy
        }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home isLoAding={isLoAding} />} />
            <Route path="/quizpage" element={<Quizpage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<h1>Page not found.</h1>} />
            </Routes>
        </AppContext.Provider>
      </Router>
    </div>
  )
}

export default App
