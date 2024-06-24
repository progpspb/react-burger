import styles from './order-details.module.css';
import { TOrderDetails } from '../../types/types';
import doneImg from '../../images/done.png';

const OrderDetails = ({order}: TOrderDetails) => {
    return (
        <div className={styles.details}>
            <div className={styles.sum + 'text text_type_digits-large'}>{order.number}</div>
            <div className='text text_type_main-medium mt-8'>идентификатор заказа</div>
            <div className='mt-15 mb-15'><img src={doneImg} alt='done' width="120" /></div>
            <div className='text text_type_main-default mb-2'>Ваш заказ начали готовить</div>
            <div className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</div>
        </div>
    );
};

export default OrderDetails;