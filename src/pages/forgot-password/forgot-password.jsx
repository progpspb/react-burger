import styles from './forgot-password.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';
import { forgotPassword } from '../../utils/auth.js';

export default function ForgotPassword() {

    const navigate = useNavigate();

    const { values, handleChange } = useForm({email: ''});

    const handleOnSubmit = (e) => {
        e.preventDefault();
        try {
            forgotPassword(values.email);
            localStorage.setItem('resetPassword', true);
            navigate('/reset-password');
        } catch (err) {
            console.error(`Ошибка: ${err}`);
        }
    }

    return (
        <div className={styles.form_wrapper}>
        <h2>Восстановление пароля</h2>
        <form className={styles.form} onSubmit={handleOnSubmit}>
            <EmailInput
                type={'email'}
                placeholder={'Укажите E-mail'}
                onChange={handleChange}
                value={values.email}
                name={'email'}
                size={'default'}
            />
            <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                Восстановить
            </Button>
        </form>            
        <div className='text text_type_main-default text_color_inactive'>
            <p className={styles.footer_text}>
                Вспомнили пароль? 
                <Link to={'/login'} className={styles.footer_link}>Войти</Link>
            </p>
        </div>
    </div>        
    )
}