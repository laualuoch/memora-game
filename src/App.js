import card from './images/card.svg';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
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

        <div class="container">
          <div class="row">
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
    <Button />
    </>
  )
}


const Button = () => {
  return (
    <button 
    type="button" 
    class="btn btn-outline-warning" 
    onClick = {() => 
      console.log('Clicked')}>
      Replay
      </button>
  )
}

const Display = () => {
  return (
    <pre>
      Times clicked
    </pre>
  )
}

export default App;
