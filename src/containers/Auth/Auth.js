import React, { useState } from "react";
import './Auth.scss'
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";

import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Auth = (props) => {

  const [isFormValid, changeFormValid] = useState(false);
  const [formControls, changeFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный Email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Password',
      errorMessage: 'Введите коррктный Password',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      }
    },
  });

  const registerHandler = () => {

    props.auth(
      formControls.email.value,
      formControls.password.value,
      false
    )
  }

  const loginHandler = () => {

    props.auth(
      formControls.email.value,
      formControls.password.value,
      true
    )
  }

  const submitHandler = (event) => {
    event.preventDefault();
  }
  
  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  const onChangeHandler = (event, controlName) => {
    
    const formControl = { ...formControls };
    const control = { ...formControl[controlName] };
    
    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControl[controlName] = control;

    let isFormValid = true;

    Object.keys(formControl).forEach(name => {
      isFormValid = formControl[name].valid && isFormValid;
    })

    changeFormControls(formControl);
    changeFormValid(isFormValid);
  }

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidete={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
    <div className={'Auth'}>
      <h1>Авторизация</h1>
      <form onSubmit={submitHandler} className={'AuthForm'}>

        {
          renderInputs()
        }

        <Button
          type={'Button_success'}
          onClick={loginHandler}
          disabled={!isFormValid}
        >Войти
        </Button>
        <Button
          type={'Button_primary'}
          onClick={registerHandler}
          disabled={!isFormValid}
        >Зарегистрироваться
        </Button>
      </form>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
  }
}

export default connect(null, mapDispatchToProps)(Auth);