import styles from './login.module.css';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../../services/actions/auth.js';

export default function LoginPage() {

    const dispatch = useDispatch();

    const { isError, errMessage } = useSelector(state => state.auth);

    const [ values, setValue ] = useState({email: '', password: ''});

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(authLogin(values.email, values.password));
    }

    const onChange = e => {
        setValue({...values, [e.target.name]: e.target.value});
        e.preventDefault();
    }

    return (
        <div className={styles.form_wrapper}>
            <h2>Вход</h2>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <EmailInput
                    type='email'
                    placeholder='E-mail'
                    onChange={onChange}
                    value={values.email}
                    name='email'
                    size='default'
                />
                <Input
                    type='password'
                    placeholder='Пароль'
                    onChange={onChange}
                    value={values.password}
                    name='password'
                    size='default'
                />
                {isError && errMessage && <span className={styles.error + ' text text_type_main-small mt-1'}>{errMessage}!</span>}
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                    Войти                
                </Button>
            </form>            
            <div className='text text_type_main-default text_color_inactive'>
                <p className={styles.footer_text}>
                    Вы — новый пользователь? 
                    <Link to={'/register'} className={styles.footer_link}>Зарегистрироваться</Link>
                </p>
                <p className={styles.footer_text + ' mt-4'}>
                    Забыли пароль? 
                    <Link to={'/forgot-password'} className={styles.footer_link}>Восстановить пароль</Link>
                </p>
            </div>
        </div>
    )
}