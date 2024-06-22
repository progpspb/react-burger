import styles from './profile.module.css';
import { MouseEvent } from 'react';
import { useDispatch } from '../../hooks';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { authLogout } from '../../services/actions/auth';

export default function ProfilePage() {

    const dispatch = useDispatch();
    const location = useLocation();
    const curPage = location.pathname;

    const logout = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(authLogout());
    }
    
    return (        
        <div className={styles.profile}>
            <div className={"pl-5"}>
                <nav className={styles.links}>
                    <NavLink to={'/profile'} className={curPage === '/profile' ? styles.link_active : styles.link}>Профиль</NavLink>
                    <NavLink to={'/profile/orders'} className={curPage === '/profile/orders' ? styles.link_active : styles.link}>История заказов</NavLink>
                    <NavLink to={'/logout'} className={styles.link} onClick={logout}>Выход</NavLink>
                </nav>
                <p className={styles.text + ' text text_type_main-small'}>В этом разделе вы можете<br/>изменить свои персональные данные</p>
            </div>
            <Outlet />
        </div>       
    )
}