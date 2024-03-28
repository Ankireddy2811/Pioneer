// App.js
import {Component} from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Sidebar from './components/CryptocurrencyPrices';
import PopulationGraph from "./components/PopulationGraph"
import CryptocurrencyPieChart from "./components/CryptocurrencyPieChart"
import CryptocurrencyPrices from "./components/CryptocurrencyPrices"

class App extends Component {
  render() {
    return (
      
        <div className="app">
          <PopulationGraph/>
          <CryptocurrencyPieChart/>
          <CryptocurrencyPrices/>
        </div>
  
    );
  }
}

export default App;
