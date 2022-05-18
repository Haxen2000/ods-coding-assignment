import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let data = [];

  React.useEffect(() => {
    async function getData() {
      const response = await fetch('/data/flights.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      const flights = csv.split(/\n/);
      const headers = flights.shift().split(/,/);
      // data = JSON.parse(csv);
      for (let flightCount = 0; flightCount < flights.length; flightCount++) {
        let obj = {};
        const flight = flights[flightCount].split(/,/);
        for (let dataCount = 0; dataCount < headers.length; dataCount++) {
          obj[headers[dataCount]] = flight[dataCount];
        }
        data[obj.id] = obj;
      }
      console.log(data);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <div className="input-group mt-3 mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="station">Enter a station:</span>
        </div>
        <input type="text" className="form-control" placeholder="City or Airport Code" aria-label="City" aria-describedby="station" />
      </div>
      <div id='data-table'></div>
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
