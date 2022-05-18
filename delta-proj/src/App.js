import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AutofillInputBox from './components/AutofillInputBox';

function App() {
  let [flightsData, updateFlightsData] = useState([]);
  let [inputAutofill, updateInputAutofill] = useState([]);

  React.useEffect(() => {
    async function getData() {
      const response = await fetch('/data/flights.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      const flights = csv.split(/\n/);
      const headers = flights.shift().split(/,/);
      let tempFlights = [], tempAutofill = [];
      for (let flightCount = 0; flightCount < flights.length; flightCount++) {
        let obj = {};
        const flight = flights[flightCount].split(/,/);
        for (let dataCount = 0; dataCount < headers.length; dataCount++) {
          const currHeader = headers[dataCount];
          const currData = flight[dataCount];
          obj[currHeader] = currData;
          if (currData && (currHeader === 'destination' || currHeader === 'destination_full_name' || currHeader === 'origin' || currHeader === 'origin_full_name') && !tempAutofill.includes(currData)) {
            tempAutofill.push(currData);
          }
        }
        tempFlights[obj.id] = obj;
      }
      updateFlightsData(tempFlights);
      updateInputAutofill(tempAutofill);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <div className="input-group mt-3 mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="station">Enter a station:</span>
        </div>
        <AutofillInputBox inputAutofill={inputAutofill} />
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
