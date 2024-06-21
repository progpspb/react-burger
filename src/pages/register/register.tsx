import styles from './register.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { authRegister } from '../../services/actions/auth';

export default function RegisterPage() {

    const dispatch = useDispatch();

    const { isError, errMessage } = useSelector((state: any) => state.auth);

    const { values, handleChange } = useForm({email: '', password: '', name: ''});

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(authRegister(values.email, values.password, values.name) as any);
    }

    return (
        <div className={styles.form_wrapper}>
            <h1>Регистрация</h1>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <Input 
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                    value={values.name} 
                    onChange={handleChange}
                />
                <EmailInput 
                    name={'email'}
                    value={values.email} 
                    onChange={handleChange}
                />
                <PasswordInput 
                    name={'password'}
                    value={values.password} 
                    onChange={handleChange}
                />
                {isError && errMessage && <span className={styles.error + ' text text_type_main-small mt-1'}>{errMessage}!</span>}
                <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">Зарегистрироваться</Button>
            </form>
            <div className='text text_type_main-default text_color_inactive'>
                <p className={styles.footer_text}>
                    Уже зарегистрированы?
                    <Link to={'/login'} className={styles.footer_link}>Войти</Link>
                </p>
            </div>
        </div>
    )
}