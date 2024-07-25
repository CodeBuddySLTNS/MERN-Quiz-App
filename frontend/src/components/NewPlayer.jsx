import { useRef, useState, useContext } from 'react';
import Axios from 'axios';
import { AppContext } from '../App';
import { BiSolidErrorCircle } from "react-icons/bi";
import { BiTargetLock } from "react-icons/bi";

const NewPlayer = () => {
  const { setIsLoAding, setPlayerPoints, setPlayerName } = useContext(AppContext);
  const [isAvailable, setIsAvailable] = useState({status: false, checking: false});
  const inputRef = useRef(null);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if(inputRef.current.value.length < 1){
      return;
    }
    
    setIsAvailable({status: false, checking: true});
    
    const response = await Axios.get(`http://localhost:4500/api/createNewPlayer?player=${inputRef.current.value.trim()}`);
    
    if(response.data.response == "unavailable"){
      return setIsAvailable({status: true, checking: false});
    }
    
    localStorage.setItem('player', response.data.response._id);
    
    setPlayerPoints(response.data.response.points);
    setPlayerName(response.data.response.name);
    setTimeout(function() {
      setIsLoAding({status: false, found: true});
    }, 400);
  }
  
  return(
    <div className="NewPlayerContainer">
      <form className="NewPlayer" onSubmit={handleSubmit}>
        <input 
          type="text" 
          ref={inputRef}
          onChange={() => setIsAvailable({status: false, checking: false})}
          placeholder="YOUR NAME" 
        />
        { isAvailable.checking && <div className="checking">
          <BiTargetLock className="icon" />
          <p>checking availability...</p>
        </div> }
        { isAvailable.status && <div className="availability">
          <BiSolidErrorCircle className="icon" />
          <p>player name already taken.</p>
        </div> }
        <button>Enter</button>
      </form>
    </div>
  )
}

export default NewPlayer