import styles from './login.module.css';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../../services/actions/auth.js';

export default function LoginPage() {

    const dispatch = useDispatch();

    const { authError, authErrMessage } = useSelector(state => state.auth);

    const [values, setValue] = useState({email: '', password: ''});

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
                {authError && authErrMessage && <span className={styles.error + ' text text_type_main-small mt-1'}>{authErrMessage}!</span>}
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                    Войти                
                </Button>
            </form>            
            <div className={styles.footer}>
                <p className={styles.footer_text}>Вы — новый пользователь? 
                    <Link to={'/register'}>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="ml-2 pl-2">
                            Зарегистрироваться
                        </Button>
                    </Link>
                </p>
                <p className={styles.footer_text}>Забыли пароль? 
                    <Link to={'/forgot-password'}>
                        <Button htmlType="button" type="secondary" size="medium" extraClass="ml-2">
                            Восстановить пароль
                        </Button>
                    </Link>
                </p>
            </div>
        </div>
    )
}