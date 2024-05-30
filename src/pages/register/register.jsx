import styles from './register.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authRegister } from '../../services/actions/auth.js';

export default function RegisterPage() {

    const dispatch = useDispatch();

    const { authError, authErrMessage } = useSelector(state => state.auth);

    const [values, setValue] = useState({email: '', password: '', name: ''});

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(authRegister(values.email, values.password, values.name));
    }

    const onChange = (e) => {
        setValue({...values, [e.target.name]: e.target.value});
        e.preventDefault();
    }

    return (
        <div className={styles.form_wrapper}>
            <h1>Регистрация</h1>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <Input 
                    placeholder="Имя" 
                    name="name" 
                    value={values.name} 
                    onChange={onChange}
                />
                <EmailInput 
                    name="email" 
                    value={values.email} 
                    onChange={onChange}
                />
                <PasswordInput 
                    name="password" 
                    value={values.password} 
                    onChange={onChange}
                />
                {authError && authErrMessage && <span className={styles.error + ' text text_type_main-small mt-1'}>{authErrMessage}!</span>}
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Зарегистрироваться</Button>
            </form>
            <div className={styles.footer}>
                <p className={styles.footer_text}>Уже зарегистрированы?
                    <Link to={'/login'}>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="ml-2">Войти</Button>
                    </Link>
                </p>
            </div>
        </div>
    )
}