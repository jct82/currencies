import axios from 'axios';
import Home from 'src/components/Home';
import currencyData from 'src/data/currency.json';

const App = () => {
  console.log(currencyData);
  return (
    <div className="app">
      <header className="App-header">
        header
      </header>
      <Home />
    </div>
  );
}

export default App;
