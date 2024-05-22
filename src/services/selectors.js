
// BurgerIngredients
export const getIngredients = (state) => state.ingredients.ingredients;
export const getIngredientsLoading = (state) => state.ingredients.isLoading;
export const getIngredientsError = (state) => state.ingredients.isError;

// BurgerConstructor
export const getBurgerBun = (state) => state.burger.bun;
export const getBurgerIngredients =(state) => state.burger.ingredients;

export const setTotalPrice = (state) => {
    const bun = getBurgerBun(state);
    const bunPrice = bun ? bun.price * 2 : 0;

    return state.ingredientsConstructor.ingredients.reduce((acc, item) => {
        return acc + item.price;
    }, bunPrice);
}