import card from './images/card.svg';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';


const Card = ( {onClick}) => {
  return (
    <img src={card} class="btn img-fluid" alt="Card One"></img>
  )
}

const FlipCardGame = () => {
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
          <div class="row">
            <div class="col">
              <Card />
            </div>
            <div class="col">
              <Card />
            </div>
            <div class="col">
              <Card />
            </div>
            <div class="col">
              <Card />
            </div>
            <div class="col">
              <Card />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <Card />
            </div>
            <div class="col">
              <Card />
            </div>
            <div class="col">
              <Card />
            </div>
            <div class="col">
              <Card />
            </div>
            <div class="col">
              <Card />
            </div>
          </div>
        </div>


        <div class = "container">
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
    <Display />
    <Display />
    <Display />
    <Button />
    </>
  )
}

//moves, allowed moves,
//rounds played, and accuracy (optional but for extra points).


const Button = ({task},{clickAction}) => {
  return (
    <button 
    type="button" 
    class="btn btn-outline-warning" 
    onClick = {{clickAction}}>
     {task}
    </button>
  )
}

const Display = ({item}, {count}) => {
  return (
    <pre>
      {item}: {count}
    </pre>
  )
}

export default FlipCardGame;
