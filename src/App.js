import card from './images/card.svg';
import cap from './images/bee-cap.svg';
import romper from './images/bee-romper.svg';
import shoes from './images/bee-shoes.svg';
import skirt from './images/bee-skirt.svg';
import shirt from './images/bee-shirt.svg';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const FlipCardGame = () => {

  const defaultImage = card

  const [cards, setCards] = useState ([
    { id: 1, value: 'bee-shirt', flipped: false, matched: false, flippedImage: shirt },
    { id: 2, value: 'bee-shoes', flipped: false, matched: false, flippedImage: shoes },
    { id: 3, value: 'bee-cap', flipped: false, matched: false, flippedImage: cap },
    { id: 4, value: 'bee-romper', flipped: false, matched: false, flippedImage: romper },
    { id: 5, value: 'bee-romper', flipped: false, matched: false, flippedImage: romper },
    { id: 6, value: 'bee-skirt', flipped: false, matched: false, flippedImage: skirt },
    { id: 7, value: 'bee-shirt', flipped: false, matched: false,flippedImage: shirt },
    { id: 8, value: 'bee-cap', flipped: false, matched: false, flippedImage: cap },
    { id: 9, value: 'bee-shoes', flipped: false, matched: false, flippedImage: shoes },
    { id: 10, value: 'bee-skirt', flipped: false, matched: false, flippedImage: skirt },
  ]);

  const [flippedCardIds, setFlippedCardIds] = useState([]);
  const [matchedCardIds, setMatchedCardIds] = useState([]);

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

    // Check if two cards are flipped
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      const flippedCard1 = cards.find((card) => card.id === card1);
      const flippedCard2 = cards.find((card) => card.id === card2);

      

      // If the values of the flipped cards match, mark them as matched
      if (flippedCard1.value === flippedCard2.value) {
        flippedCard1.matched = true;
        flippedCard2.matched = true;
        setMatchedCardIds([...matchedCardIds, card1, card2]);
        setFlippedCardIds([]);
      } else {
        // If the values don't match, flip the cards back after a short delay
        setTimeout(() => {
          flippedCard1.flipped = false;
          flippedCard2.flipped = false;
          setFlippedCardIds([]);
        }, 200);
      }
    }
  };


  const handleReplay = () => {
    setFlippedCardIds([]);
    setMatchedCardIds([]);
    setCards(cards.map((card) => ({ ...card, flipped: false, matched: false })));
  };

  const GameStats = () => {
    return (
      <>
      <Display countItem = "Moves"/>
      <Display countItem = "Allowed Moves"/>
      <Display countItem = "Rounds Played"/>
      <Display countItem = "Accuracy"/>
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
  
  const Display = ({countItem}, {count}) => {
    return (
      <div>
        <h6>{countItem}: {count}</h6>
      </div>
    )
  }
  
  const Card = ( {card}) => {
    return (
      <img 
      src={card.flipped ? card.flippedImage : defaultImage} 
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