import * as React from 'react';
import { ModalProps, Modal as AModal } from 'antd';

import './Modal.scss';

interface IModalProps extends ModalProps {}

const Modal: React.FC<IModalProps> = ({ ...rest }) => {
  return <AModal {...rest} />;
};

export default Modal;
