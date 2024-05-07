import React, { useState, useEffect } from 'react';
import SampleDataset from './data/SampleDataset.csv';
import * as d3 from 'd3';
import './App.css';
import Child2 from './Child2'
import Child1 from './Child1'

function App() {
  const [csvData, setCsvData] = useState([]);
  useEffect(() => {
    d3.csv(SampleDataset)
      .then((fetchedData) => {
        setCsvData(fetchedData);
      })
      .catch((error) => {
        console.error("Error loading the csv file at path");
      });
  }, []);

  useEffect(() => {
    if (csvData.length > 0) {
      console.log(csvData)

      const ACOUNT = csvData.reduce((accumulator, item) => {
        console.log(item.category)
        if (item.category === 'B') {
          return accumulator += 1;
        } 
        return accumulator
      }, 0);

      console.log(ACOUNT);
    }
  }, [csvData])

  return (
    <div className='container'>
      <div className='bar-chart'>
        <Child1 data={csvData} />
      </div>
      <div className='child2-container'>
        <Child2 data={csvData} />
      </div>
    </div>
  );
}

export default App;
