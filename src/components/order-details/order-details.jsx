import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const OrderDetails = ({order}) => {
    return (
        <div className={styles.details}>
            <div className={styles.sum + 'text text_type_digits-large'}>{order.number}</div>
            <div className='text text_type_main-medium mt-8'>{order.id}</div>
            <div className='mt-15 mb-15'><CheckMarkIcon type="primary" /></div>
            <div className='text text_type_main-default mb-2'>{order.status}</div>
            <div className='text text_type_main-default text_color_inactive mb-30'>{order.message}</div>
        </div>
    );
};

OrderDetails.propTypes = {
    order: PropTypes.object.isRequired
};

export default OrderDetails;