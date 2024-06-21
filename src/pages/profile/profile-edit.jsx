import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm.js';
import { authUpdateUser } from '../../services/actions/auth.js';
import { getUser } from '../../services/selectors.js';

export default function ProfileEdit() {

    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const { isError, errMessage } = useSelector(state => state.auth); 
    const [ isChanged, setChanged ] = useState(false);

    const { values, handleChange, setValues } = useForm({name: user.name, email: user.email, password: 'password'});

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(authUpdateUser(values));
        setChanged(false);
    }

    const cancelUpdate = (e) => {
        setValues({
            ...user, 
            name: user.name, 
            email: user.email,
            password: user.password
        })
        setChanged(false);
    }

    return (
        <div className={styles.form_wrapper}>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <Input 
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                    value={values.name} 
                    onChange={handleChange}
                    icon={'EditIcon'}
                />
                <EmailInput 
                    type={'email'}
                    name={'email'}
                    value={values.email} 
                    onChange={handleChange}
                    icon={'EditIcon'}
                />
                <PasswordInput 
                    type={'password'}
                    name={'password'}
                    value={values.password} 
                    onChange={handleChange}
                    icon={'EditIcon'}
                />
                {isError && errMessage && <span className={styles.error + ' text text_type_main-small mt-1'}>{errMessage}!</span>}
                {isChanged &&
                    <div className={styles.wrap_buttons}>
                        <Button htmlType="button" type="secondary" onClick={cancelUpdate}>Отменить</Button>
                        <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
                    </div>
                }
            </form>
        </div>
    )
}