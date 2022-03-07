import React from "react";
import './Input.scss';

function isInvalid({valid, touched, shouldValidete}) {
  // console.log('isInvalid-!valid: ',  !valid, 'isInvalid-shouldVal: ', shouldValidete, 'isInvalid-touched: ', touched)
  // console.log('isInvalid: ', !valid && shouldValidete && touched)
  return (!valid && shouldValidete && touched)
}

const Input = (props) => {
  const inputType = props.type || 'text';
  const cls = ['Input'];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push('invalid');
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        autoComplete={inputType}
      />

      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }


    </div>
  )
}

export default Input;