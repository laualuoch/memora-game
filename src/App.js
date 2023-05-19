import card from './images/card.svg';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css';

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
              <img src={card} class="img-fluid" alt="Card One"></img>
            </div>
            <div class="col">
              <img src={card} class="img-fluid" alt="Card Two"></img>
            </div>
            <div class="col">
              <img src={card} class="img-fluid" alt="Card Three"></img>
            </div>
            <div class="col">
              <img src={card} class="img-fluid" alt="Card Four"></img>
            </div>
            <div class="col">
              <img src={card} class="img-fluid" alt="Card Five"></img>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <img src={card} class="img-fluid" alt="Card Ten"></img>
            </div>
            <div class="col">
              <img src={card} class="img-fluid" alt="Card Nine"></img>
            </div>
            <div class="col">
              <img src={card} class="img-fluid" alt="Card Eight"></img>
            </div>
            <div class="col">
              <img src={card} class="img-fluid" alt="Card Seven"></img>
            </div>
            <div class="col">
              <img src={card} class="img-fluid" alt="Card Six"></img>
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
