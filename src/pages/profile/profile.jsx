import styles from './profile.module.css';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { authLogout } from '../../services/actions/auth.js';

export default function ProfilePage() {

    const dispatch = useDispatch();
    const location = useLocation();
    const curPage = location.pathname;

    const logout = (e) => {
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