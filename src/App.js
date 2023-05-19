import card from './images/card.svg';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const FlipCardGame = () => {

  const [cards, setCards] = useState ([
    { id: 1, value: 'bee-cap', flipped: false, matched: false, defaultImage: {card}},
    { id: 2, value: 'bee-romper', flipped: false, matched: false, defaultImage: {card }},
    { id: 3, value: 'bee-skirt', flipped: false, matched: false, defaultImage: {card }},
    { id: 4, value: 'bee-shoes', flipped: false, matched: false, defaultImage: {card}},
    { id: 5, value: 'bee-shirt', flipped: false, matched: false,defaultImage: {card }},
    { id: 6, value: 'bee-cap', flipped: false, matched: false, defaultImage: {card} },
    { id: 7, value: 'bee-romper', flipped: false, matched: false, defaultImage: {card}},
    { id: 8, value: 'bee-skirt', flipped: false, matched: false, defaultImage: {card}},
    { id: 9, value: 'bee-shoes', flipped: false, matched: false, defaultImage: {card}},
    { id: 10, value: 'bee-shirt', flipped: false, matched: false, defaultImage: {card}},
  ]);

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
          <GameManager />
        </div>
      </body>
    </div>
    </>
  );
}

const GameManager = () => {
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

const Button = ({countItem},{clickAction}) => {
  return (
    <button 
    type="button" 
    class="btn btn-outline-warning" 
    onClick = {{clickAction}} >
     Replay
    </button>
  )
}

const Display = ({countItem}, {count}) => {
  return (
    <div>
      <h6>{countItem}: {count}</h6>
    </div>
  )
}

const Card = ( {onClick}) => {
  return (
    <img src={card} class="btn img-fluid" alt="Card One"></img>
  )
}

const DisplayCards = () => {
  return (
    <div>
      {[0, 1].map((row) => (
        <Row key={row}>
          {[0, 1, 2, 3, 4].map((col) => (
            <Col key={col}>
              <Card />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  )
}

export default FlipCardGame;
