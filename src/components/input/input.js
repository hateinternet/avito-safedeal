import React from 'react';
import cn from 'classnames';

import './input.css';

const Input = ({name, value, onChange, placeholder, errorText = 'Заполните поле', isValid = true }) => {
  const cls = cn({
    'input': true,
    'input_filled': value.length > 0,
    'input_error': !isValid,
  });
  const placeholderText = isValid ? placeholder : errorText;

  return (
    <div className={cls}>
      <input className="input__field" type="text" name={name} value={value} onChange={onChange}/>
      <div className="input__placeholder">{placeholderText}</div>
    </div>
  );
};

export default Input;
