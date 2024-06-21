import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { authUpdateUser } from '../../services/actions/auth';
import { getUser } from '../../services/selectors';

export default function ProfileEdit() {

    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const { isError, errMessage } : any  = useSelector<any>(state => state.auth); 
    const [ isChanged, setChanged ] = useState(false);

    const { values, handleChange, setValues } : any  = useForm({name: user.name, email: user.email, password: 'password'});

    const handleOnSubmit = (e:any) => {
        e.preventDefault();
        dispatch(authUpdateUser(values) as any);
        setChanged(false);
    }

    const cancelUpdate = (e:any) => {
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
                    name={'email'}
                    value={values.email} 
                    onChange={handleChange}
                />
                <PasswordInput 
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