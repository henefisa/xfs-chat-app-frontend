import * as React from 'react';
import clsx from 'clsx';

import './Input.scss';

interface IInputCheckboxProps {
  className?: string;
  label: string;
  friendId?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCheckbox: React.FC<IInputCheckboxProps> = ({
  className,
  label,
  friendId,
  handleChange,
  ...rest
}) => {
  const idForInput = label.toLowerCase().split(' ').join('-');

  return (
    <div className={clsx('checkbox', className)} {...rest}>
      <input
        type="checkbox"
        id={idForInput}
        value={friendId}
        onChange={handleChange}
      />
      <label htmlFor={idForInput} className="checkbox__label">
        {label}
      </label>
    </div>
  );
};

export default InputCheckbox;
