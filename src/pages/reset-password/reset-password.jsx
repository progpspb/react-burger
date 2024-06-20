import styles from './reset-password.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { resetPassword } from '../../utils/auth.js';

export default function ResetPassword() {

    const navigate = useNavigate();

    const [values, setValue] = useState({password: '', code: ''});

    useEffect(() => {
        if (!localStorage.getItem('resetPassword')) {
            navigate('/forgot-password');
        }
    }, [navigate]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        try {
            resetPassword(values.password, values.code);
            localStorage.removeItem('resetPassword');
            navigate('/login');
        } catch (err) {
            console.error(`Ошибка: ${err}`);
        }
    }

    const onChange = e => {
        e.preventDefault();
        setValue({...values, [e.target.name]: e.target.value});
    }

    return (
        <div className={styles.form_wrapper}>
        <h2>Восстановление пароля</h2>
        <form className={styles.form} onSubmit={handleOnSubmit}>
            <Input
                type='password'
                placeholder={'Введите новый пароль'}
                onChange={onChange}
                value={values.password}
                name={'password'}
                size={'default'}
            />
            <Input 
                name="code" 
                value={values.code} 
                onChange={onChange}
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