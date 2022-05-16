import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="input-group mt-3 mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="station">Enter a station:</span>
        </div>
        <input type="text" class="form-control" placeholder="City or Airport Code" aria-label="City" aria-describedby="station" />
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
