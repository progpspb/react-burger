import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, FormEvent, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { useForm } from '../../hooks/useForm';
import { authUpdateUser } from '../../services/actions/auth';
import { getUser } from '../../services/selectors';
import { TUser } from '../../types/types';

export default function ProfileEditPage() {

    const dispatch = useDispatch();
    const user = useSelector(getUser);

    const { isError, errMessage } = useSelector((state) => state.auth); 
    const [ isChanged, setChanged ] = useState(false);

    const { values, handleChange, reset } = useForm({name: user?.name, email: user?.email, password: ''});

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();       
        dispatch(authUpdateUser(values as TUser))
        setChanged(false);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
        setChanged(true);
    }

    const cancelUpdate = (e: SyntheticEvent) => {
        reset();
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
                    onChange={onChange}
                    icon={'EditIcon'}
                />
                <EmailInput 
                    name={'email'}
                    value={values.email} 
                    onChange={onChange}
                />
                <PasswordInput 
                    name={'password'}
                    value={values.password} 
                    onChange={onChange}
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