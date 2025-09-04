import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ArrowCounterclockwise } from 'react-bootstrap-icons';
import card from './images/card.json';
import cap from './images/bee-cap.json';
import romper from './images/bee-romper.json';
import shoes from './images/bee-shoes.json';
import skirt from './images/bee-skirt.json';
import shirt from './images/bee-shirt.json';
import a from './images/a.json';
import h from './images/h.json';
import p from './images/p.json';
import y from './images/y.json';
import u from './images/u.json';
import n from './images/n.json';
import './css/main.css';
import 'bootstrap/dist/css/bootstrap.css';

const GAME_STATE = 'flipCardGameState'

const FlipCardGame = () => {

  const defaultImage = card

  const loadGameState = () => {
    const storedState = localStorage.getItem(GAME_STATE);
    if(storedState) {
      return JSON.parse(storedState);
    }
    return null;
  }

  const saveGameState = (state) => {
    localStorage.setItem(GAME_STATE, JSON.stringify(state));
    document.cookie = '${GAME_STATE}=${JSON.stringify(state)}; expires=Fri, 31 Dec 2050 23:59:59 GMT';
  }

  const initialState = loadGameState() || {
    cards: [
      { id: 1, value: 'bee-shirt', flipped: false, matched: false, flippedImage: shirt, surpriseImage: h },
      { id: 2, value: 'bee-shoes', flipped: false, matched: false, flippedImage: shoes, surpriseImage: a },
      { id: 3, value: 'bee-cap', flipped: false, matched: false, flippedImage: cap, surpriseImage: p },
      { id: 4, value: 'bee-romper', flipped: false, matched: false, flippedImage: romper, surpriseImage: p},
      { id: 5, value: 'bee-romper', flipped: false, matched: false, flippedImage: romper, surpriseImage: y },
      { id: 6, value: 'bee-skirt', flipped: false, matched: false, flippedImage: skirt, surpriseImage: h },
      { id: 7, value: 'bee-shirt', flipped: false, matched: false,flippedImage: shirt , surpriseImage: u},
      { id: 8, value: 'bee-cap', flipped: false, matched: false, flippedImage: cap, surpriseImage: n },
      { id: 9, value: 'bee-shoes', flipped: false, matched: false, flippedImage: shoes, surpriseImage: n },
      { id: 10, value: 'bee-skirt', flipped: false, matched: false, flippedImage: skirt, surpriseImage: y }
    ],
    flippedCardIds: [],
    matchedCardIds: [],
    moves: 0,
    gamesPlayed: 0,
    gameCompleted: false,
    successfulMoves: 0
  };

  const [cards, setCards] = useState (initialState.cards);
  const [flippedCardIds, setFlippedCardIds] = useState(initialState.flippedCardIds);
  const [matchedCardIds, setMatchedCardIds] = useState(initialState.matchedCardIds);
  const [moves, setMoves] = useState(initialState.moves);
  const [gamesPlayed, setGamesPlayed] = useState(initialState.gamesPlayed);
  const [gameCompleted, setGameCompleted] = useState(initialState.gameCompleted);
  const [successfulMoves, setSuccessfulMoves] = useState(initialState.successfulMoves);
  
  useEffect(() => {
    const gameState = {
      cards,
      flippedCardIds,
      matchedCardIds,
      moves,
      gamesPlayed,
      gameCompleted,
      successfulMoves
    };

    saveGameState(gameState);
  }, [cards, flippedCardIds, matchedCardIds, moves, gamesPlayed, gameCompleted, successfulMoves]); 

  /*Using Match expectations outcome outline by 
  Daniel J.Vellman and Gregory S. Warrington here's a calculation for 
  expoected number of tries. Linked https://arxiv.org/abs/1208.4854
  */
  const maxMoves = (1.61 * cards.length).toFixed(0);


  const handleCardClick = (cardId) => {
    console.log(cardId)

    const flippedCards = [...flippedCardIds];
    const flippedCard = cards.find((card) => card.id === cardId);

    // If the card is already flipped or matched, ignore the click
    if (flippedCard.flipped || flippedCard.matched) {
      return;
    }

    // Flip the card
    flippedCard.flipped = true;
    flippedCards.push(cardId);

    setFlippedCardIds(flippedCards);

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      const flippedCard1 = cards.find((card) => card.id === card1);
      const flippedCard2 = cards.find((card) => card.id === card2);
      setMoves((moves)=> moves + 1);

      if (flippedCard1.value === flippedCard2.value) {
        flippedCard1.matched = true;
        flippedCard2.matched = true;
        setMatchedCardIds([...matchedCardIds, card1, card2]);
        setFlippedCardIds([]);
        setSuccessfulMoves((successfulMoves)=> successfulMoves + 1);
        
        
        if(matchedCardIds.length === cards.length - 2) {
          setGameCompleted(true);
          console.log('Game completed!')
        };

      } else {
        // Flip cards that dont match back after a short while
        setTimeout(() => {
          flippedCard1.flipped = false;
          flippedCard2.flipped = false;
          setFlippedCardIds([]);
        }, 200);
      }
    }
  };

  const calculateAccuracy = () => {
    const successfulMovesNumber = parseFloat(successfulMoves);
    const movesNumber = parseFloat(moves);

    const accuracy = ((successfulMovesNumber * 100) / movesNumber).toFixed(0);
    
    return isNaN(accuracy) ? 0 : accuracy;
  }

  const handleReplay = () => {
    setFlippedCardIds([]);
    setMatchedCardIds([]);
    setCards(cards.map((card) => ({ ...card, flipped: false, matched: false })));
    setMoves(0);
    setGamesPlayed((gamesPlayed) => gamesPlayed + 1);
    setGameCompleted(false);
    setSuccessfulMoves(0);
  };

  const GameStats = () => {

    const accuracy = calculateAccuracy();
    return (
      <>
        <div className="group-container row justify-content-center">
          <div className="col-6">
            <Display countItem = "Allowed Moves" count={maxMoves} />
            <Display countItem = "Moves" count={moves}/>
            <Display countItem = "Moves Left" count={maxMoves - moves}/>
          </div>

          <div className="col-6">
            <Display countItem = "Rounds Played" count={gamesPlayed} />
            <Display countItem = "Successful Moves" count={ successfulMoves }/>
            <Display countItem = "Accuracy" count={ accuracy + "%" }/>
          </div>
        </div>

        <div className="group-container">
          <div className="row justify-content-center">
              <div className="col-4">
                <Display countItem="Wins" count="To be Calculated"/>
              </div>

              <div className="col-4">
                <Display countItem="Losses" count="To be Calculated"/>
              </div>

              <div className="col-4">
                <Button />
              </div>

          </div>
        </div>
      </>
    )
  }
  
  const Button = () => {
    return (
      <button type="button" 
      className="btn btn-warning" 
      onClick={handleReplay}>
        <ArrowCounterclockwise />
        Replay
      </button>
    );
  }
  
  const Display = ({countItem, count}) => {
    return (
      <div>
        <h6><b>{countItem}:</b> {count}</h6>
      </div>
    )
  }
  
  const Card = ( {card}) => {
    const isTopRow = card.id <= cards.length / 2;
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    return (
      <div
      className={`card-container ${isHovered ? (isTopRow ? 'raise' : 'lower') : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleCardClick(card.id)}
      >
        <Player
          autoplay = {true}
          loop = {false}
          src = {
            card.matched && gameCompleted
            ? card.surpriseImage
            : card.flipped
            ? card.flippedImage
            : defaultImage
        }    
      />
      </div>
     )
  };
  
  const DisplayCards = () => {
    return (
      <div>
        {[0, 1].map((row) => (
          <Row key={row}>
            {[0, 1, 2, 3, 4].map((col) => (
              <Col key={col}>
                <Card card= {cards[row * 5 + col]}/>
              </Col>
            ))}
          </Row>
        ))}
      </div>
    )
  };

  return (
    <>
     <div className="App">
      <header className='App-header'>
       <h1 className="game-title">
        Memora
       </h1>
      </header>
      <div className="App-body container">
        <div className= "row justify-content-center">
          <div className="col-4">
            <h4>
              **Game Instructions**
            </h4>

            <ol>
              <li>You will see a row of face-down cards on the game board.</li>
              <li>Click on a card to flip it face up.</li>
              <li>Once a card is face up, click on another card to flip it as well.</li>
              <li>The objective is to flip matching cards consecutively to render the move a successful move.</li>
              <li>When two cards flipped match, the cards are left face up</li>
              <li>When the two cards flipped do not match, both cards are flipped back face down.</li>
              <li>The goal is to flip all the cards (face up) to eventually reveal a surprise for a win.</li>
            </ol>

            <h4>
              **Tips**
            </h4>

            <ol>
              <li>Pay attention to the Cards flipped to move strategically.</li>
              <li>Using the minimum moves possible is a win scenario</li>
            </ol>

            <h4>
            **Replay**
            </h4>

            <ol>
              <li>After completing the game, press replay button to start a new game session.</li>
            </ol>
          </div>
          <div className="col-8">

          <fieldset>
            <legend>
              <h4>**Game Stats**</h4>
            </legend>

            <GameStats />
          </fieldset>

            <DisplayCards />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default FlipCardGame;