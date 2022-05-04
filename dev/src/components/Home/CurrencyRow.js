import { useDispatch } from 'react-redux';
import { useState } from "react";

import { roundNum, getColor } from "../../utils/methods";
import { addCur } from "../../actions/buyer";
import { addCourb } from "../../actions/currency";


const CurrencyRow = ({data, period}) => {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  //buy a currency => add it to user's wallet in the state
  const buyCur = () => {
    dispatch(addCur(data.name, data.rate, data.inverseRate, quantity));
    setQuantity(1);
  }

  //change selected quantity of currency to buy 
  const changeQuant = (e) => {
    setQuantity(Number(e.target.value) > 0 ? Number(e.target.value) : 1);
  }

  //poster court tendancie, up or down, of currency for selected period
  let tendance;
  let progress = (data.inverseRate / data.history[7-period].inverseRate * 100) - 100;
  if (progress > 0) {
    tendance = 'asc';
  } else if (progress < 0) {
    tendance = 'des';
  } else if (progress === 0) {
    tendance = 'lin';
  }

  //prepare data of selected currency for fluctuation court currency line chart
  const addLineChart = () => {
    let color = getColor();
    let dataTab = data.history.map(cur => ({x: cur.date, y: roundNum(cur.inverseRate, 100)}));
    dataTab.push({x: data.date, y: roundNum(data.inverseRate, 100)});
    dispatch(addCourb({'id':data.name, 'data':dataTab, 'color': color}));
  }
  
  return (
    <div className="row tr">
      <div className="cell name">{data.name}</div>
      <div className="cell rate">{data.rate}</div>
      <div className="cell inverse">{data.inverseRate}</div>
      <div className="cell progress">
        {progress < 0 ? '-' : '+'}
        {progress !== 0 ? roundNum(Math.abs(progress), 100) : progress}
        <div className={`arrow ${tendance}`}></div>
      </div>
      <div className="cell cta">
        <button type="button" className="cta-buy" onClick={buyCur}>Acheter</button>
        <input type="number" min="1" onChange={changeQuant} name="quantity" value={quantity}></input>
        <button className="cta-see" type="button" onClick={addLineChart}></button>
      </div>
    </div>
  );
};

export default CurrencyRow;
