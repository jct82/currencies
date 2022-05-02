import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ConnectProfil from './ConnectProfil';
import AddProfil from './AddProfil';
import { displayModal, connect, posterDisco } from "../../actions/buyer";

import './styles.scss';
const Auth = () => {
  const dispatch = useDispatch();
  const { logModal, connected, name, discoBtn} = useSelector((state) => state.buyer);

  //display authentication modals 
  const showModal = (e) => {
    dispatch(displayModal(e.target.name));
  }

  //display disconnect button
  useEffect(() => {
    const closeDisconnect = (ev) => {
      if (ev.target.classList.contains('disconnect')) dispatch(connect());
      dispatch(posterDisco());
    }

    if (discoBtn) window.addEventListener('click', closeDisconnect);
    return () => window.removeEventListener('click', closeDisconnect);
  }, [discoBtn]);


  const disconnect = (e) => {
    if (!discoBtn) dispatch(posterDisco());
  }
  

  return(
    <div className="auth">
      {logModal == 'off' && 
        <><button className="button-connect" type="button" onClick={connected == false ? showModal : disconnect} name="connect"></button>
        {discoBtn &&<button className="disconnect" type="button">{name}</button>}
        </>
      }
      {logModal == 'connect' && <ConnectProfil />}
      {logModal == 'addUser' && <AddProfil />}
    </div>
  );
};

export default Auth;
