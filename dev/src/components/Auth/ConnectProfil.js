import { useDispatch, useSelector } from 'react-redux';

import { changeField, displayModal, logUser } from "../../actions/buyer";

import './styles.scss';
const ConnectProfil = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.buyer);

  const updateField = (e) => {
    dispatch(changeField(e.target.name, e.target.value));
  }

  const showModal = (e) => {
    e.preventDefault();
    dispatch(displayModal(e.target.getAttribute('name')));
  }

  const logIn = (e) => {
    e.preventDefault();
    dispatch(logUser());
  }

  return(
    <div className="modal-box connect">
      <div className="close-modal" onClick={showModal} name="off">X</div>
      <div className="input-wrapper">
        <input type="email" name="email" value={email} onChange={updateField} placeholder="email" />
      </div>
      <div className="input-wrapper">
        <input type="password" name="password" value={password} onChange={updateField} placeholder="password" />
      </div>
      <div className="input-wrapper">
        <button className="button" onClick={logIn} type="submit">se connecter</button>
      </div>
      <div onClick={showModal} name="addUser">Créer un compte</div>
    </div>
  );
};

export default ConnectProfil;
