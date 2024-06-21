import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = ({ title, children, onClose}: { title: string, children: any, onClose: () => void }) => {

    useEffect(() => {

        function closeModal(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener('keydown', closeModal);

        return () => {
            document.removeEventListener('keydown', closeModal);
        }

    },[onClose]);
      
    return createPortal(
        <>
        <div className={styles.modal}>
            <div className={styles.title}>
                {title}
                <span className={styles.close}><CloseIcon type="primary" onClick={onClose} /></span>
            </div>
            <div className={styles.body}>{children}</div>
        </div>
        <ModalOverlay onClose = {onClose}  />
        </>,
        document.getElementById("modal") as HTMLElement
    );
};

export default Modal;