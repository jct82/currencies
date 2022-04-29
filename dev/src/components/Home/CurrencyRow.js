//imports nécessaire pour pouvoir appeler les propriétés du state et appelé les fonctions du fichier action
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { addCur, changeField } from "../../actions/buyer";


const CurrencyRow = ({data, period}) => {
  const dispatch = useDispatch();
  const { money } = useSelector((state) => state.buyer);

  const [quantity, setQuantity] = useState(1);

  const roundNum = (num, unit) => {
    let setUnit = unit;
    while ((num * setUnit) < 1) setUnit *=  10;
    return (Math.round(num * setUnit) / setUnit)
  };

  const buyCur = () => {
    dispatch(addCur(data.name, data.rate, data.inverseRate, quantity));
    setQuantity(1);
  }

  const changeQuant = (e) => {
    setQuantity(Number(e.target.value) * data.inverseRate <= money ? Number(e.target.value) : Math.floor(money / data.inverseRate));
  }

  let tendance;
  let progress = (data.inverseRate / data.history[7-period].inverseRate * 100) - 100;
  if (progress > 0) {
    tendance = 'asc';
  } else if (progress < 0) {
    tendance = 'des';
  } else if (progress == 0) {
    tendance = 'lin';
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
        <button type="button" onClick={buyCur}>Acheter</button>
        <input type="number" min="1" onChange={changeQuant} name="quantity" value={quantity}></input>
      </div>
    </div>
  );
};

export default CurrencyRow;
