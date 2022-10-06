import * as React from 'react';
import clsx from 'clsx';

import './Input.scss';

interface IInputCheckboxProps {
  className?: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputCheckbox: React.FC<IInputCheckboxProps> = ({
  className,
  label,
  ...rest
}) => {
  const idForInput = label.toLowerCase().split(' ').join('-');

  return (
    <div className={clsx('checkbox', className)} {...rest}>
      <input type="checkbox" id={idForInput} />
      <label htmlFor={idForInput} className="checkbox__label">
        {label}
      </label>
    </div>
  );
};

export default InputCheckbox;
