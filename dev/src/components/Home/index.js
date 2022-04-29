//imports nécessaire pour pouvoir appeler les propriétés du state et appelé les fonctions du fichier action
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import currencyData from '../../data/currency.json';
import CurrencyRow from './CurrencyRow';
import { testAction, changeName } from "../../actions/buyer";

import './styles.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { wallet, name, money } = useSelector((state) => state.buyer);

  const roundNum = (num, unit) => {
    let setUnit = unit;
    while ((num * setUnit) < 1) setUnit *=  10;
    return (Math.round(num * setUnit) / setUnit)
  };

  const createDate = (days) => {
    let dateSet = new Date();
    dateSet.setHours(dateSet.getHours() + 2);
    dateSet.setDate(dateSet.getDate() - days);
    let UTCSet = dateSet.toUTCString();
    return UTCSet;
  }

  const fluctuat = (rate) => {
    const percent = Math.ceil(Math.random() * 50);
    return Math.random() < 0.5 ? (100 * rate) / (percent + 100) : rate / (1 - (percent / 100));
  }

  const fillHistory = (val) => {
    let weekValues = [];
    for (let i = 6; i > 0; i--) {
      weekValues.push({
        date:createDate(i),
        inverseRate: fluctuat(val)
      });
    }
    return weekValues;
  }

  let newCurTab = [...currencyData.currencies].map(cur => ({
    ...cur,
    date: createDate(0),
    rate: roundNum(cur.rate, 100),
    inverseRate: roundNum(cur.inverseRate, 100),
    history: fillHistory(roundNum(cur.inverseRate, 100))
  }));

  let [currencies, setCurrencies] = useState(newCurTab);
  let [sortedDir, setSortedDir] = useState('up');

  const sortTab = (e) => {
    let type = e.target.getAttribute('type');
    let sorted = [...currencies].sort((a, b) => {
      if (a[type] > b[type]) return sortedDir == 'up' ? 1 : -1;
      if (a[type] < b[type]) return sortedDir == 'up' ? -1 : 1;
      return 0;
    });
    setSortedDir(sortedDir == 'up' ? 'down' : 'up');
    setCurrencies(sorted);
  }

  const [period, setPeriod] = useState(2);

  const sortProgress = () => {
    let sorted = [...currencies].sort((a, b) => {
      let progressA = a.inverseRate * 100 / a.history[7 - period].inverseRate;
      let progressB = b.inverseRate * 100 / b.history[7 - period].inverseRate;
      if (progressA > progressB) {
        return sortedDir == 'up' ? 1 : -1;
      }
      if (progressA < progressB) {
         return sortedDir == 'up' ? -1 : 1;
      }
      return 0;
    });
    setSortedDir(sortedDir == 'up' ? 'down' : 'up');
    setCurrencies(sorted);
  }

  const dayRange = (e) => {
    setPeriod(e.target.value);
    setSortedDir(sortedDir == 'down' ? 'up' : 'down');
    sortProgress();
  }

  const stopPropa = (e) => {
    e.stopPropagation();
  }

  let JSXRow = currencies.map(elem => <CurrencyRow key={elem.code} data={elem} period={period} />);
  
  let amount = 0;
  wallet.forEach(cur => amount += (cur.inverseRate * cur.quantity));

  
  return (
    <div className="home">
      <div className="user-info">
        <div>{name}</div> 
        <div>Panier&nbsp;: <span>{amount > 0 ? roundNum(amount, 100).toLocaleString() : 0}&nbsp;$</span></div>
        <div>Disponible&nbsp;: <span>{money > 0 ? roundNum(money, 100).toLocaleString() : 0}&nbsp;$</span></div>
      </div>
      <div className="currency-tab tab">
        <div className="row th">
          <div className={`cell name ${sortedDir} sorted`} onClick={sortTab} type="name">
            nom
            <div className="arrow asc"></div>
            <div className="arrow des"></div>
          </div>
          <div className={`cell rate ${sortedDir} sorted`} onClick={sortTab} type="rate">
            taux
            <div className="arrow asc"></div>
            <div className="arrow des"></div>
          </div>
          <div className={`cell inverse ${sortedDir} sorted`} onClick={sortTab} type="inverseRate">
            taux inversé
            <div className="arrow asc"></div>
            <div className="arrow des"></div>
          </div>
          <div className={`cell progress ${sortedDir} sorted`} onClick={sortProgress} >
            <select onChange={dayRange} onClick={stopPropa} value={period}>
              <option value="2">2 j</option>
              <option value="3">3 j</option>
              <option value="4">4 j</option>
              <option value="5">5 j</option>
              <option value="6">6 j</option>
              <option value="7">7 j</option>
            </select>
            <div className="arrow asc"></div>
            <div className="arrow des"></div>
          </div>
          <div className="cell cta">acheter</div>
        </div>
        {JSXRow}
      </div>
    </div>
  );
};

export default Home;
