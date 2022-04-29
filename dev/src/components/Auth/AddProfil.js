import { useDispatch, useSelector } from 'react-redux';

import { changeField, displayModal } from "../../actions/buyer";

import './styles.scss';
const AddProfil = () => {
  const dispatch = useDispatch();
  const { name, email, password, confirmPassword} = useSelector((state) => state.buyer);

  const updateField = (e) => {
    dispatch(changeField(e.target.name, e.target.value));
  }

  const showModal = (e) => {
    dispatch(displayModal(e.target.getAttribute('name')));
  }

  return(
    <div className="modal-box add-user">
      <div className="close-modal" onClick={showModal} name="off">X</div>
      <div className="input-wrapper">
        <input type="text" name="name" value={name} onChange={updateField} placeholder="name" />
      </div>
      <div className="input-wrapper">
        <input type="email" name="email" value={email} onChange={updateField} placeholder="email" />
      </div>
      <div className="input-wrapper">
        <input type="password" name="password" value={password} onChange={updateField} placeholder="password" />
      </div>
      <div className="input-wrapper">
        <input type="confirm-password" name="confirmPassword" value={confirmPassword} onChange={updateField} placeholder="confirm password" />
      </div>
      <div className="input-wrapper">
        <button className="button" type="submit">Créer mon compte</button>
      </div>
    </div>
  );
};

export default AddProfil;
