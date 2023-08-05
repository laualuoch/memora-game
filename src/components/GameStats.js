import GameStatsItem from "./GameStatsItem"

const GameStats = () => {
    return (
        <>
        <GameStatsItem countItem = "Allowed Moves" count={maxMoves} />
        <GameStatsItem countItem = "Moves" count={moves}/>
        <GameStatsItem countItem = "Moves Left" count={maxMoves - moves}/>
        <GameStatsItem countItem = "Rounds Played" count={gamesPlayed} />
        <GameStatsItem countItem = "Successful Moves" count={ successfulMoves }/>
        <GameStatsItem countItem = "Accuracy" count={ accuracy }/>
        </>
    );
}

export default GameStats;