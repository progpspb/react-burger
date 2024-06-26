import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';

const AppHeader = () => {

    const location = useLocation();
    const curPage = location.pathname;

    return (
        <header className={styles.header}>
            <nav className={styles.navbar + ' pb-4 pt-4'}>
                <div className={styles.nav_left }>
                    <NavLink to={'/'} className={curPage === '/' ? styles.nav_link_active : styles.nav_link}>
                        <BurgerIcon type="primary"/>
                        <span>Конструктор</span>
                    </NavLink>
                    <NavLink to={'/orders'} className={curPage === '/orders' ? styles.nav_link_active : styles.nav_link}>
                        <ListIcon type="secondary"/>
                        <span>Лента заказов</span>
                    </NavLink>
                </div>
                <div className={styles.nav_center}>
                    <Logo />
                </div>
                <div className={styles.nav_right}>
                    <NavLink to={'/profile'} className={curPage === '/profile' ? styles.nav_link_active : styles.nav_link}>
                        <ProfileIcon type="secondary"/>
                        <span>Личный кабинет</span>
                    </NavLink>
                </div>
            </nav>              
        </header>
    );
}

export default AppHeader;