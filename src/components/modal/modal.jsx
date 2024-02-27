import {useEffect} from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const Modal = ({ title, children, isOpen, setModalOpened }) => {

    const handleOverlayClick = (e) => {
        e.stopPropagation();
        setModalOpened(false);
    };

    useEffect(() => {
        const handleCloseEsc = (event) => {
            if (event.key === 'Escape') setModalOpened(false);
        };

        isOpen && document.addEventListener('keydown', handleCloseEsc);

        return () => {
            document.removeEventListener('keydown', handleCloseEsc);
        }
    }, [isOpen, setModalOpened]);    
  
    if (!isOpen) return null;
    
    return createPortal(
        <>
        <div className={styles.modal}>
            <div className={styles.title}>
                {title}
                <span className={styles.close}><CloseIcon type="primary" onClick={() => setModalOpened(false)} /></span>
            </div>
            <div className={styles.body}>{children}</div>
        </div>
        <ModalOverlay onModalClosed = {handleOverlayClick}  />
        </>,
        document.getElementById("modal")
    );
};

Modal.propTypes = {
    title: PropTypes.string,    
    children: PropTypes.element.isRequired,
    isOpen: PropTypes.bool.isRequired,
    setModalOpened: PropTypes.func.isRequired,
};

export default Modal;