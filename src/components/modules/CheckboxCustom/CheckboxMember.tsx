import * as React from 'react';
import clsx from 'clsx';

import './CheckboxCustom.scss';

export interface ICheckboxMemberProps {
  className?: string;
  label: string;
  friendId?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxMember: React.FC<ICheckboxMemberProps> = ({
  className,
  label,
  friendId,
  handleChange,
}) => {
  const idForInput = label.toLowerCase().split(' ').join('-');

  return (
    <div className={clsx('checkbox', className)}>
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

export default CheckboxMember;
