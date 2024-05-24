import styles from './register.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function RegisterPage() {

    const [value, setValue] = useState({email: '', password: '', name: ''});

    const handleOnSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <div className={styles.form_wrapper}>
            <h1>Регистрация</h1>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <Input 
                    placeholder="Имя" 
                    name="name" 
                    value={value.name} 
                    onChange={onChange}
                />
                <EmailInput 
                    name="email" 
                    value={value.email} 
                    onChange={onChange}
                />
                <PasswordInput 
                    name="password" 
                    value={value.password} 
                    onChange={onChange}
                />
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