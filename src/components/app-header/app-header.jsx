import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = (props) => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar + ' pb-4 pt-4'}>
                <div className={styles.nav_left }>
                    <a href="!#" className={styles.nav_link + ' pl-5 pt-4 pr-5 pb-4'}>
                        <BurgerIcon type="primary"/>
                        <span className={styles.nav_link_active}>Конструктор</span>
                    </a>
                    <a href="!#" className={styles.nav_link + ' pl-5 pt-4 pr-5 pb-4'}>
                        <ListIcon type="secondary"/>
                        <span>Лента заказов</span>
                    </a>
                </div>
                <div className={styles.nav_center}>
                    <Logo />
                </div>
                <div className={styles.nav_right}>
                    <a href="!#" className={styles.nav_link + ' pl-5 pt-4 pr-5 pb-4'}>
                        <ProfileIcon type="secondary"/>
                        <span>Личный кабинет</span>
                    </a>
                </div>
            </nav>              
        </header>
    );
}

export default AppHeader;