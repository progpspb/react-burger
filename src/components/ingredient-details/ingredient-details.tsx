import styles from './ingredient-details.module.css';
import { useParams } from "react-router";
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/selectors';
import { IngredientType } from '../../types/types';

const IngredientDetails : React.FC = () => {

  const { id } = useParams();
  const ingredients = useSelector(getIngredients);
  const ingredient = ingredients.find((ingredient:IngredientType) => ingredient._id === id); 
  
  if(!ingredient) {
    return null;
  }

  return (
    <div className={styles.details}>
      <img width="480" height="240" className='mb-4' src={ingredient.image_large} alt={ingredient.name} />
      <div className='text text_type_main-medium'>{ingredient.name}</div>
      <ul className={styles.items}>
        <li className={styles.item}>
          <span>Калории, ккал</span>
          <span className='text text_type_digits-default'>{ingredient.calories}</span>
        </li>
        <li className={styles.item}>
          <span>Белки, г</span>
          <span className='text text_type_digits-default'>{ingredient.proteins}</span>
        </li>
        <li className={styles.item}>
          <span>Жиры, г</span>
          <span className='text text_type_digits-default'>{ingredient.fat}</span>
        </li>
        <li className={styles.item}>
          <span>Углеводы, г</span>
          <span className='text text_type_digits-default'>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;