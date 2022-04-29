import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { removeCur } from "../../actions/buyer";

const UserRow = ({data}) => {
  const dispatch = useDispatch();
  const { wallet } = useSelector((state) => state.buyer);

  const [quantity, setQuantity] = useState(1);
  
  const roundNum = (num) => Math.round(num * 1000) / 1000;

  const sellCur = () => {
    dispatch(removeCur(data.name, data.rate, data.inverseRate, quantity));
    setQuantity(1);
  }

  const changeQuant = (e) => {
    setQuantity(Number(e.target.value) <= data.quantity ? Number(e.target.value) : data.quantity);
  }

  return (
    <div className="row">
      <div className="cell name">{data.name}</div>
      <div className="cell rate">{roundNum(data.rate)}</div>
      <div className="cell inverse">{roundNum(data.inverseRate)}</div>
      <div className="cell quantity">{data.quantity}</div>
      <div className="cell cta">
        <button type="button" onClick={sellCur}>Vendre</button>
        <input type="number" min="1" max={data.quantity} onChange={changeQuant} name="quantity" value={quantity}></input>
      </div>
    </div>
  );
};

export default UserRow;
