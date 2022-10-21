import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';

import './Input.scss';

interface IInputCheckboxProps {
  className?: string;
  label: string;
}

const InputCheckbox: React.FC<IInputCheckboxProps> = ({
  className,
  label,
  ...rest
}) => {
  const idForInput = label.toLowerCase().split(' ').join('-');

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const hanleCheckedChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={clsx('checkbox', className)} {...rest}>
      <input
        type="checkbox"
        id={idForInput}
        checked={isChecked}
        onChange={hanleCheckedChange}
      />
      <label htmlFor={idForInput} className="checkbox__label">
        {label}
      </label>
    </div>
  );
};

export default InputCheckbox;
