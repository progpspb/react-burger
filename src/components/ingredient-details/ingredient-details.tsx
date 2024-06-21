import styles from './ingredient-details.module.css';
import { IngredientType } from '../../types/ingredient';
import { useParams } from "react-router";
import { useSelector } from 'react-redux';
import { getIngredients } from '../../services/selectors';

const IngredientDetails:any = () => {

  const { id } = useParams();
  const ingredients:any = useSelector(getIngredients);
  const ingredient = ingredients.find((ingredient:IngredientType) => ingredient._id === id); 
  
  if(!ingredient) {
    return;
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