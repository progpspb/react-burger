import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onModalClosed }) => {        
    return (
        <div
            className={styles.overlay}
            onClick={onModalClosed}
        />
    );
};

ModalOverlay.propTypes = {
    onModalClosed: PropTypes.func.isRequired,
};

export default ModalOverlay;