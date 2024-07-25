import { useNavigate } from 'react-router-dom';

const Prompt = ({message = "Are you sure you want to quit? You will lose your progress.", cancel}) => {
  const navigate = useNavigate();
  
  return(
    <div className="promptContainer">
      <div className="promptBox">
        <p>{message}</p>
        <div className="promptOptions">
          <button className="quitPrompt" onClick={() => navigate(-1)}>
            Quit
          </button>
          <button className="cancelPrompt" onClick={() => cancel(!true)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Prompt;