import styles from './reset-password.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authResetPassword } from '../../services/actions/auth.js';

export default function ResetPassword() {

    const dispatch = useDispatch();

    const [values, setValue] = useState({password: '', code: ''});

    const step = true;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(authResetPassword(values.password,values.code));
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
            {step && (
                <Input 
                    name="code" 
                    value={values.code} 
                    onChange={onChange}
                    placeholder={'Введите код из письма'}
                />
            )}
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