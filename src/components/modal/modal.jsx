import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const Modal = ({ title, children, onClose, isOpen }) => {

    useEffect(() => {
        document.addEventListener('keydown', closeModal);
        return () => {
            document.removeEventListener('keydown', closeModal);
        }
    });

    function closeModal(event) {
        if (event.key === "Escape") {
            onClose();
        }
    };
      
    return createPortal(
        <>
        <div className={styles.modal}>
            <div className={styles.title}>
                {title}
                <span className={styles.close}><CloseIcon type="primary" onClick={() => onClose()} /></span>
            </div>
            <div className={styles.body}>{children}</div>
        </div>
        <ModalOverlay onClose = {()=>onClose()}  />
        </>,
        document.getElementById("modal")        
    );
};

Modal.propTypes = {
    title: PropTypes.string,    
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;