import styles from './forgot-password.module.css';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ForgotPassword() {

    const [value, setValue] = useState({email: '', code: ''});

    const step = true;

    const handleOnSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = e => {
        setValue(e.target.value)
    }
    return (
        <div className={styles.form_wrapper}>
        <h2>Восстановление пароля</h2>
        <form className={styles.form} onSubmit={handleOnSubmit}>
            <EmailInput
                type={'email'}
                placeholder={'Укажите E-mail'}
                onChange={onChange}
                value={value.email}
                name={'email'}
                size={'default'}
            />
            {step && (
                <Input 
                    name="code" 
                    value={value.code} 
                    onChange={onChange}
                />
            )}
            <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
                Восстановить                
            </Button>
        </form>            
        <div className={styles.footer}>
            <p className={styles.footer_text}>Вспомнили пароль? 
                <Link to={'/login'}>
                    <Button htmlType="button" type="secondary" size="medium" extraClass="ml-2">
                        Войти
                    </Button>
                </Link>
            </p>
        </div>
    </div>        
    )
}