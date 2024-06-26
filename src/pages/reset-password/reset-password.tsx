import styles from './reset-password.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, FormEvent } from 'react';
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../utils/auth';

export default function ResetPasswordPage() {

    const navigate = useNavigate();
    const { values, handleChange } = useForm({password: '', code: ''});

    useEffect(() => {
        if (!localStorage.getItem('resetPassword')) {
            navigate('/forgot-password');
        }
    }, [navigate]);

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            resetPassword(values.password, values.code);
            localStorage.removeItem('resetPassword');
            navigate('/login');
        } catch (err) {
            console.error(`Ошибка: ${err}`);
        }
    }

    return (
        <div className={styles.form_wrapper}>
        <h2>Восстановление пароля</h2>
        <form className={styles.form} onSubmit={handleOnSubmit}>
            <PasswordInput
                placeholder={'Введите новый пароль'}
                onChange={handleChange}
                value={values.password}
                name={'password'}
                size={'default'}
            />
            <Input 
                type={'text'}
                name={'code'}
                value={values.code} 
                onChange={handleChange}
                placeholder={'Введите код из письма'}
            />
            <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                Сохранить                
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