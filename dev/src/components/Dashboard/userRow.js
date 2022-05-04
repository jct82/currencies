import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { removeCur } from "../../actions/buyer";
import { roundNum } from "../../utils/methods";

const UserRow = ({data}) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  //sell currency. remove it from user's wallet
  const sellCur = () => {
    dispatch(removeCur(data.name, data.rate, data.inverseRate, quantity));
    setQuantity(1);
  }

  //change quantity of selected currency to sell
  const changeQuant = (e) => {
    let quant = Number(e.target.value);
    if (quant < 1) quant = 1;
    setQuantity(quant <= data.quantity ? quant : data.quantity);
  }

  return (
    <div className="row">
      <div className="cell name">{data.name}</div>
      <div className="cell rate">{roundNum(data.rate, 100)}</div>
      <div className="cell inverse">{roundNum(data.inverseRate, 100)}</div>
      <div className="cell quantity">{data.quantity}</div>
      <div className="cell cta">
        <button className="cta-sell" type="button" onClick={sellCur}>Vendre</button>
        <input type="number" min="1" max={data.quantity} onChange={changeQuant} name="quantity" value={quantity}></input>
      </div>
    </div>
  );
};

export default UserRow;
