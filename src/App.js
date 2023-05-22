import card from './images/card.svg';
import cap from './images/bee-cap.svg';
import romper from './images/bee-romper.svg';
import shoes from './images/bee-shoes.svg';
import skirt from './images/bee-skirt.svg';
import shirt from './images/bee-shirt.svg';
import a from './images/a.svg';
import h from './images/h.svg';
import p from './images/p.svg';
import y from './images/y.svg';
import u from './images/u.svg';
import n from './images/n.svg';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

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
      { id: 1, value: 'bee-shirt', flipped: false, matched: false, flippedImage: shirt, supriseImage: h },
      { id: 2, value: 'bee-shoes', flipped: false, matched: false, flippedImage: shoes, supriseImage: a },
      { id: 3, value: 'bee-cap', flipped: false, matched: false, flippedImage: cap, supriseImage: p },
      { id: 4, value: 'bee-romper', flipped: false, matched: false, flippedImage: romper, supriseImage: p},
      { id: 5, value: 'bee-romper', flipped: false, matched: false, flippedImage: romper, supriseImage: y },
      { id: 6, value: 'bee-skirt', flipped: false, matched: false, flippedImage: skirt, supriseImage: h },
      { id: 7, value: 'bee-shirt', flipped: false, matched: false,flippedImage: shirt , supriseImage: u},
      { id: 8, value: 'bee-cap', flipped: false, matched: false, flippedImage: cap, supriseImage: n },
      { id: 9, value: 'bee-shoes', flipped: false, matched: false, flippedImage: shoes, supriseImage: n },
      { id: 10, value: 'bee-skirt', flipped: false, matched: false, flippedImage: skirt, supriseImage: y }
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
      gameCompleted
    };

    saveGameState(gameState);
  }, [cards, flippedCardIds, matchedCardIds, moves, gamesPlayed, gameCompleted, successfulMoves]);


  //this is a value I have decided to go with 10 should be the min moves allowed
  const maxMoves = cards.length * 2;

  const handleCardClick = (cardId) => {
    console.log('Card clicked!')

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
    setMoves((moves)=> moves + 1);

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      const flippedCard1 = cards.find((card) => card.id === card1);
      const flippedCard2 = cards.find((card) => card.id === card2);

      if (flippedCard1.value === flippedCard2.value) {
        flippedCard1.matched = true;
        flippedCard2.matched = true;
        setMatchedCardIds([...matchedCardIds, card1, card2]);
        setFlippedCardIds([]);
        setSuccessfulMoves((successfulMoves) => successfulMoves + 1);
        
        if(matchedCardIds.length === cards.length - 2) {
          setGameCompleted(true);
          console.log('Game completed!')
        }

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
    return (successfulMoves * 100) / moves;
  }

  const handleReplay = () => {
    setFlippedCardIds([]);
    setMatchedCardIds([]);
    setCards(cards.map((card) => ({ ...card, flipped: false, matched: false })));
    setMoves(0);
    setGamesPlayed((gamesPlayed) => gamesPlayed + 1);
    setGameCompleted(false)
  };

  const GameStats = () => {
    return (
      <>
      <Display countItem = "Allowed Moves" count={maxMoves} />
      <Display countItem = "Moves" count={moves}/>
      <Display countItem = "Moves Left" count={maxMoves - moves}/>
      <Display countItem = "Rounds Played" count={gamesPlayed} />
      <Display countItem = "Accuracy" count={ calculateAccuracy() }/>
      <Button />
      </>
    )
  }
  
  const Button = () => {
    return (
      <button type="button" 
      className="btn btn-outline-warning" 
      onClick={handleReplay}>
        Replay
      </button>
    );
  }
  
  const Display = ({countItem, count}) => {
    return (
      <div>
        <h6>{countItem}: {count}</h6>
      </div>
    )
  }
  
  const Card = ( {card}) => {
    return (
      <img 
      src={ 
        card.matched && gameCompleted
        ? card.supriseImage
        : card.flipped 
        ? card.flippedImage 
        : defaultImage} 
      class="btn img-fluid" 
      onClick={()=> handleCardClick(card.id)}
      alt= { 'Card ${card.id} '}
      />
    )
  }
  
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
        <p>
            Flip card to Play!
        </p>
      </header>
      <body className="App-body">
        <div class="container">
          <DisplayCards />
        </div>


        <div class = "container">
          <h4>Game Stats</h4>
          <GameStats />
        </div>
      </body>
    </div>
    </>
  );
}

export default FlipCardGame;