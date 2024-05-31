import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUpdateUser } from '../../services/actions/auth.js';
import { getUser } from '../../services/selectors.js';

export default function ProfileEdit() {

    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const { isError, errMessage } = useSelector(state => state.auth); 

    const [ values, setValue ] = useState({email: '', password: '', name: ''});
    const [ isChanged, setChanged ] = useState(false);

    useEffect(()=> {
        user && setValue({
            ...user, 
            name: user.name, 
            email: user.email,
            //password: user.password
        })
    },[user]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(authUpdateUser(values.name, values.email, values.password));
        setChanged(false);
    }

    const onChange = (e) => {
        setValue({...values, [e.target.name]: e.target.value});
        e.preventDefault();
        setChanged(true);
    }

    const cancelUpdate = (e) => {
        setValue({
            ...user, 
            name: user.name, 
            email: user.email,
            //password: user.password
        })
        setChanged(false);
    }

    return (
        <div className={styles.form_wrapper}>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <Input 
                    placeholder="Имя" 
                    name="name" 
                    value={values.name} 
                    onChange={onChange}
                    icon="EditIcon"
                />
                <EmailInput 
                    name="email" 
                    value={values.email} 
                    onChange={onChange}
                    icon="EditIcon"
                />
                <PasswordInput 
                    name="password" 
                    value={values.password} 
                    onChange={onChange}
                    icon="EditIcon"
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