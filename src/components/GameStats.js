import GameStatsstatItem from "./GameStatsstatItem"

const GameStats = (
    {
        maxMoves,
        moves,
        gamesPlayed,
        successfulMoves,
        accuracy
    }) => {
    const statItems = [
        { statItem: "Allowed Moves", statCount: maxMoves },
        { statItem: "Moves", statCount: moves },
        { statItem: "Moves Left", statCount: maxMoves - moves },
        { statItem: "Rounds Played", statCount: gamesPlayed },
        { statItem: "Successful Moves", statItemCount: successfulMoves },
        { statItem: "Accuracy", statItemCount: accuracy }
    ];

    return (
        <>
        {statItems.map((statItem, index) => (
            <GameStatsstatItem
            key = {index}
            countstatItem = {statItem.statItem}
            count = {statItem.statItemCount}
            />
            ))}
        </>
    );
}

export default GameStats;