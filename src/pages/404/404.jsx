import styles from './404.module.css';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export default function NotFoundPage() {
    return (
        <div className = {styles.wrapper}>
            <h1>Ошибка 404!</h1>
            <p>Запрашиваема страница не найдена.</p>
            <p>
                <Link to='/'>
                    <Button htmlType="button" type="secondary">
                        Вернуться на главную
                    </Button>
                </Link>
            </p>
        </div>
    )
}