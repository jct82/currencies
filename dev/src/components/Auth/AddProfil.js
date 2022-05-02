import { useDispatch, useSelector } from 'react-redux';

import Input from "../inputForm/inputs";
import { validateForm, validateField, checkCustom } from "../inputForm/validate";
import { changeField, displayModal, addUser } from "../../actions/buyer";

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

  const submitForm = (e) => {
    e.preventDefault();
    const comparePwd = (e.target.elements.password.value == e.target.elements.confirmPassword.value);
    const errMess = 'Les mots de passe ne sont pas identiques'
    if (checkCustom(e.target.elements.confirmPassword, errMess, comparePwd) && validateForm(e.target.elements)) dispatch(addUser());
  }
  
  //control fields
  //occur after first submit
  const formChange = (e) => {
    validateField(e.target);
  }

  return(
    <div className="modal-box add-user">
      <form encType="multipart/form-data" onSubmit={submitForm} onChange={formChange} noValidate>
        <div className="close-modal" onClick={showModal} name="off"></div>
        <Input classes="required" type="text" label="Nom" name="name" value={name} changeInput={updateField}/>
        <Input classes="required" type="email" label="Email" name="email" value={email} changeInput={updateField}/>
        <Input classes="required" type="password" label="Mot de passe" name="password" value={password} changeInput={updateField}/>
        <Input classes="required" type="password" label="Confirmez votre mot de passe" name="confirmPassword" value={confirmPassword} changeInput={updateField}/>
        <button className="button btn" type="submit">Créer mon compte</button>
      </form>
    </div>
  );
};

export default AddProfil;
