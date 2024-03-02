import React from 'react';
import Modal from 'react-modal';
import styles from './myModal.module.less';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const MyModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      zIndex: '9999',
    },
    content: {
      borderRadius: '32px',
      width: '375px',
      height: '300px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className={styles.modal}> {children}</div>
    </Modal>
  );
};

export default MyModal;
