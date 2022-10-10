import * as React from 'react';
import { TooltipProps, Tooltip as ATooltip } from 'antd';
import clsx from 'clsx';

import './Tooltip.scss';

type ITooltipProps = TooltipProps & {
  tooltipTitle?: string;
  className?: string;
  isActive?: boolean;
  children: React.ReactNode | React.FC;
};

const Tooltip: React.FC<ITooltipProps> = ({
  className,
  tooltipTitle,
  isActive,
  children,
  ...rest
}) => {
  return (
    <ATooltip className="tooltip" title={tooltipTitle} {...rest}>
      <div className={clsx(className, { active: isActive })}>{children}</div>
    </ATooltip>
  );
};

export default Tooltip;
