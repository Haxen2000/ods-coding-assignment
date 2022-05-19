import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AutofillInputBox from './components/AutofillInputBox';

function App() {
  let [flightsData, updateFlightsData] = useState([]);
  let [inputAutofillList, updateInputAutofill] = useState([]);
  let [availableFlights, updateAvailableFlights] = useState([]);

  useEffect(() => {
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
          if (currData && (currHeader === 'destination' || currHeader === 'destination_full_name' || currHeader === 'origin' || currHeader === 'origin_full_name')) {
            if (!tempAutofill[currData]) {
              tempAutofill[currData] = [flight[0]];
            }
            else {
              tempAutofill[currData].push(flight[0]);
            }
          }
        }
        tempFlights[obj.id] = obj;
      }
      updateFlightsData(tempFlights);
      console.log(tempAutofill);
      updateInputAutofill(tempAutofill);
    }
    getData();
  }, []);

  const getFlights = (s) => {
    console.log(inputAutofillList[s]);
    const flightIds = inputAutofillList[s];
    let tempFlights = [];
    for (let i = 0; i < flightIds.length; i++) {
      tempFlights.push(flightsData[flightIds[i]]);
    }
    updateAvailableFlights(tempFlights);
  };

  return (
    <div className="App">
      <div className="input-group my-3 justify-content-center">
        <div className="input-group-prepend">
          <span className="input-group-text" id="station">Enter a station:</span>
        </div>
        <AutofillInputBox inputAutofill={inputAutofillList} getFlights={getFlights} />
      </div>
      {availableFlights.length > 0 && (
        <table class="table table-bordered w-75 m-auto">
          <thead>
            <tr>
              <th scope='col'>Flight Number</th>
              <th scope='col' colspan='2'>Departure</th>
              <th scope='col' colspan='2'>Arrival</th>
              
            </tr>
          </thead>
          <tbody>
          {availableFlights.map(
            flight => (
                <tr>
                  <th>{flight.flt_num}</th>
                  <td>{flight.origin_full_name} ({flight.origin})</td>
                  <td>{flight.out_gmt}</td>
                  <td>{flight.destination_full_name} ({flight.destination})</td>
                  <td>{flight.in_gmt}</td>
                </tr>
            )
          )}
          </tbody>
        </table>
      )}
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
