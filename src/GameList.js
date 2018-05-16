import React from "react";
import GameCard from "./GameCard";


export default function GameList({games}){
    const emptyMessage = <p>There are no games yet in your collection.</p>;
    const gamesList =
        <div className="ui four cards">
            {games.map((game, key) =>
                <GameCard game={game} key={key}/>)}
        </div>
    return(
        <div>
            {games.length === 0 ? emptyMessage : gamesList}
        </div>
    );
}