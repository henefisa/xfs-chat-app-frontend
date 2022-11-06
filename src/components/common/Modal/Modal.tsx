import * as React from 'react';
import { ModalProps, Modal as AModal } from 'antd';
import clsx from 'clsx';

import './Modal.scss';

interface IModalProps extends ModalProps {}

const Modal: React.FC<IModalProps> = ({ className, ...rest }) => {
  return <AModal className={clsx('modal', className)} {...rest} />;
};

export default Modal;
