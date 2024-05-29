
// BurgerIngredients
export const getIngredients = (state) => state.ingredients.ingredients;
export const getIngredientsLoading = (state) => state.ingredients.isLoading;
export const getIngredientsError = (state) => state.ingredients.isError;

// BurgerConstructor
export const getBurgerBun = (state) => state.burger.bun;
export const getBurgerIngredients =(state) => state.burger.ingredients;

export const setTotalPrice = (state) => {
    const bun = state.burger.bun;    
    const bunPrice = bun ? bun.price * 2 : 0;

    return state.burger.ingredients.reduce((acc, item) => {
        return acc + item.price;
    }, bunPrice);
}

// User
export const getUser =(state) => state.auth.user;
export const isAuthorized =(state) => state.auth.isAuthorized;