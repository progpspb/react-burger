/*
import PropTypes from 'prop-types';

const ingredientPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired
});

export default ingredientPropTypes;
*/
export type IngredientType = {
    _id: string;
    name: string;
    image: string;
    type: string;
    price: number;
    calories: number;
    carbohydrates: number;
    proteins: number;
    fat: number;
    image_large: string;
    image_mobile: string;
};

/*
DraggableItem.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    moveElement: PropTypes.func.isRequired
}
*/

export type DraggableItemType = {
    children: any;
    index: number;
    moveElement: any;
    className: string;
};

/*
ProtectedRoute.propTypes = {
    component: PropTypes.node.isRequired,
    needAuth: PropTypes.bool
}
*/

export type ProtectedRouteType = {
    component: any;
    needAuth: boolean;
};

/*
OrderDetails.propTypes = {
    order: PropTypes.object.isRequired
};
*/

export type OrderDetailsType = {
    order: { number: number };
};

/*
Modal.propTypes = {
    title: PropTypes.string,    
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
};
*/

export type ModalType = {
    title: string;    
    children: any,
    onClose: void,
};