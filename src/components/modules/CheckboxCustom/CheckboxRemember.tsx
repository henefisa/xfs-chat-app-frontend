import * as React from 'react';
import clsx from 'clsx';

import './CheckboxCustom.scss';

export interface ICheckboxRememberProps {
  className?: string;
  label: string;
}

const CheckboxRemember: React.FC<ICheckboxRememberProps> = ({
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

export default CheckboxRemember;
