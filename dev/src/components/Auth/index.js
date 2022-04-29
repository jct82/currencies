import { useDispatch, useSelector } from 'react-redux';

import ConnectProfil from './ConnectProfil';
import AddProfil from './AddProfil';
import { displayModal } from "../../actions/buyer";

import './styles.scss';
const Auth = () => {
  const dispatch = useDispatch();
  const { logModal } = useSelector((state) => state.buyer);

  const showModal = (e) => {
    dispatch(displayModal(e.target.name));
  }

  return(
    <div className="auth">
      {logModal == 'off' && <button className="button-connect" type="button" onClick={showModal} name="connect"></button>}
      {logModal == 'connect' && <ConnectProfil />}
      {logModal == 'addUser' && <AddProfil />}
    </div>
  );
};

export default Auth;
