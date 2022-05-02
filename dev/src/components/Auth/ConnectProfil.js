import { useDispatch, useSelector } from 'react-redux';

import Input from "../inputForm/inputs";
import { validateForm, validateField } from "../inputForm/validate";
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

  const submitForm = (e) => {
    e.preventDefault();
    if (validateForm(e.target.elements)) dispatch(logUser());
  }

  //control fields
  //occur after first submit
  const formChange = (e) => {
    validateField(e.target);
  }

  return(
    <div className="modal-box connect">
      <form encType="multipart/form-data" onSubmit={submitForm} onChange={formChange} noValidate>
        <div className="close-modal" onClick={showModal} name="off"></div>
        <Input classes="required" type="email" label="Email" name="email" value={email} changeInput={updateField}/>
        <Input classes="required" type="password" label="Mot de passe" name="password" value={password} changeInput={updateField}/>
        <div>
          <button className="button btn" type="submit">Se connecter</button>
        </div>
        <a onClick={showModal} name="addUser">Créer un compte</a>
      </form>
    </div>
  );
};

export default ConnectProfil;
