import * as actionType from "./actions";

const intitialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const INGREDIENTS_PRICE = {
  bacon: 0.7,
  salad: 0.5,
  cheese: 0.5,
  meat: 1.2,
};

const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
      };

    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
      };

    default:
      return state;
  }
};

export default reducer;
