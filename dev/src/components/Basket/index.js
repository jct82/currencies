import { useSelector } from 'react-redux';

import { roundNum } from "../../utils/methods";

const Basket = () => {
  const { wallet, amount } = useSelector((state) => state.buyer);

  return (
    <div className="user-info">
      <div>Panier&nbsp;: <span>{wallet.length > 0 ? roundNum(amount, 100).toLocaleString() : 0}&nbsp;$</span></div>
    </div>
  );
};

export default Basket;
