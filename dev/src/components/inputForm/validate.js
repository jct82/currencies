function validateEmail (string){
  if (string.trim() == '') return true;
  let res = string.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return (res !== null);
}

let validate = true;

//control all form
export const validateForm = (formEl) => {
  validate = false;
  let val = true;
  for (let el of formEl){
    if (validateField(el) === false) val = false;
  }
  if (val === true) validate = true;
  return val;
}

//control fields on change only after first submit attempt 
export const validateField = (el) => {
  if (validate === true) return;
  let val = true;
  const controlType = () => {
    if (el.type === "email") {
      if (checkEmail(el) === false) val = false;
    } 
  }
  

  if (el.classList.contains('required')) {
    if(el.value.trim() === '') {
      if (el.classList.contains('error')) {
        el.parentNode.lastChild.innerHTML = 'Ce champs est requis';
      } else {
        el.classList.add('error');
        el.parentNode.insertAdjacentHTML('beforeend', '<div class="errormsg">Ce champs est requis</div>');
      }
      val = false;
    } else {
      if (el.classList.contains('error')) {
        el.classList.remove('error');
        el.parentNode.removeChild(el.parentNode.lastChild);
      }
      controlType();
    }
  } else {
    controlType();
  }
  return val;
}

//SPECIFIC CONTROL TYPE

//control email type
export  const checkEmail = (el) => {
  let val = true;
  if(!validateEmail(el.value)) {
    if (el.classList.contains('error')) {
      el.parentNode.lastChild.innerHTML = 'Saisissez une adresse mail valide';
    } else {
      el.classList.add('error');
      el.parentNode.insertAdjacentHTML('beforeend', '<div class="errormsg">Saisissez une adresse mail valide</div>');
    }
    val = false;
  } else {
    if (el.classList.contains('error')) {
      el.classList.remove('error');
      el.parentNode.removeChild(el.parentNode.lastChild);
    }
  }
  return val;
}

//control field to custom
export const checkCustom = (el, msg, CbackFunc) => {
  let val = true;
  if(!CbackFunc) {
    if (el.classList.contains('error')) {
      el.parentNode.lastChild.innerHTML = msg;
    } else {
      el.classList.add('error');
      el.parentNode.insertAdjacentHTML('beforeend', `<div class="errormsg">${msg}</div>`);
    }
    val = false;
  } else {
    if (el.classList.contains('error')) {
      el.classList.remove('error');
      el.parentNode.removeChild(el.parentNode.lastChild);
    }
  }
  return val;
}



