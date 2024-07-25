const RankPlayers = (props) => {
  return(
    <>
      {props.players?.map((player, index) => (
        <details key={index} className="rank">
          <summary className="rankPlayerName">
            <p><span>{index + 1}.</span> {player?.name}</p>
            <p className="rankPoints">{player?.points}</p>
          </summary>
          <div className="rankStats">
            <p className="rankAccuracy">Accuracy: <span>{player?.accuracy}%</span></p>
            <p className="rankQuizzes">Quizzes: <span>{player?.quizzes}</span></p>
          </div>
        </details>
      ))}
    </>
  )
}

export default RankPlayers;