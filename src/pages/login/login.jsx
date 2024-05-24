import styles from './login.module.css';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function LoginPage() {

    const [value, setValue] = useState({email: '', password: ''});

    const handleOnSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <div className={styles.form_wrapper}>
            <h2>Вход</h2>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <EmailInput
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={onChange}
                    value={value.email}
                    name={'email'}
                    size={'default'}
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={onChange}
                    value={value.password}
                    name={'password'}
                    size={'default'}
                />
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