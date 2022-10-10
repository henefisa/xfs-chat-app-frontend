import * as React from 'react';
import { TooltipProps, Tooltip as ATooltip } from 'antd';
import clsx from 'clsx';

import './Tooltip.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type ITooltipProps = TooltipProps & {
  tooltipTitle: string;
  className?: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<ITooltipProps> = ({
  className,
  tooltipTitle,
  children,
  ...rest
}) => {
  return (
    <ATooltip
      className={clsx('tooltip', className)}
      title={tooltipTitle}
      {...rest}
    >
      {children}
    </ATooltip>
  );
};

export default Tooltip;
