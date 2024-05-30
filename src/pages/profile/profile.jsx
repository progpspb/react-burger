import styles from './profile.module.css';
import { NavLink } from 'react-router-dom';

export default function ProfilePage() {
    return (        
        <div className={styles.profile}>
            <div className={"pl-5"}>
                <nav className={styles.links}>
                    <NavLink to={'/profile'}>Профиль</NavLink>
                    <NavLink to={'/profile/orders'}>История заказов</NavLink>
                    <NavLink to={'/logout'}>Выход</NavLink>
                </nav>
                <p className={styles.text}>В этом разделе вы можете<br/>изменить свои персональные данные</p>
            </div>
        </div>       
    )
}