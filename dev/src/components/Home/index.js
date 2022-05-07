import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { roundNum, twoD } from "../../utils/methods";
import currencyData from '../../data/currency.json';
import CurrencyRow from './CurrencyRow';
import LineCurrency from './lineCurrency';
import { setCurrencies, orderCurrencies, orderProgress, setPeriod, supCur } from "../../actions/currency";

import './styles.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { currencies, currencyCourbs, period, sortedDir } = useSelector((state) => state.currency);
  //dispatch(setCurrencies(currencyData.currencies));

  //create formated date for fluctuation court currency line chart
  const createDate = (days) => {
    let now = new Date();
    let dateSet = new Date(now.getFullYear(), now.getMonth(), now.getDate() - days);
    return ''+dateSet.getFullYear()+'-'+twoD(dateSet.getMonth() + 1)+'-'+twoD(dateSet.getDate());
  }

  //affect random court data to currency
  const fluctuat = (rate) => {
    const percent = Math.ceil(Math.random() * 50);
    return Math.random() < 0.5 ? (100 * rate) / (percent + 100) : rate / (1 - (percent / 100));
  }

  //create fake data for fluctuation court currency of past days
  const fillHistory = (val) => {
    return Array.from({length: 6}, (item, index) => ({date:createDate(Math.abs(index - 6)), inverseRate: fluctuat(val)}));
  }

  useEffect(() => {
    //prepare and complete data of json currencies for charts and tabs
    let newCurTab = [...currencyData.currencies].map(cur => ({
      ...cur,
      date: createDate(0),
      rate: roundNum(cur.rate, 100),
      inverseRate: roundNum(cur.inverseRate, 100),
      history: fillHistory(roundNum(cur.inverseRate, 100))
    }));
    dispatch(setCurrencies(newCurTab));
  },[])

  //sort currency tab according to selected type of information
  const sortTab = (e) => {
    dispatch(orderCurrencies(e.target.getAttribute('type')));
  }

  //sort currency tab according to court progression on selected period
  const sortProgress = () => {
    dispatch(orderProgress(period));
  }

  //select relevant data according to period
  let periodCourb = [...currencyCourbs];
  periodCourb = periodCourb.map(elem => ({...elem}));
  periodCourb = periodCourb.map(elem => {
    elem.data = elem.data.slice(0 - period);
    return elem;
  });

  //set period
  const dayRange = (e) => {
    dispatch(setPeriod(e.target.value));
  }

  //stop propagation of click on period select change
  //to prevent triggering sort of tab by court progression
  const stopPropa = (e) => {
    e.stopPropagation();
  }

  // JSX element of currency tab rows
  let JSXRow = currencies.map(elem => <CurrencyRow key={elem.code} data={elem} period={period} />);

  //remove currency of fluctuation court line chart 
  const removeCur = (e) =>{
    dispatch(supCur(e.target.id));
  }

  //set legends for currency fluctuation court line chart
  const JSXLegends = currencyCourbs.map(elem => (
    <div className="legend-block" key={elem.id}>
      <div className="sup" id={elem.id} onClick={removeCur}></div>
      <div className="color" style={{backgroundColor:elem.color}}></div>{elem.id}
    </div>
  ));
  
  return (
    <div className="home">
      {!!currencyCourbs.length && 
      <><div className="courbChart">
         <LineCurrency key={periodCourb.id} data={periodCourb} />
      </div>
      <div className="legends">
        {JSXLegends}
      </div></>
      }
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
