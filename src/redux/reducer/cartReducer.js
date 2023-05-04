import { ADD_CART, DELETE_CART, DELETE_ONE_ITEM } from "../actions/actionTypes";

const initialState = {
  cartProducts: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      const productIndex = state.cartProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        state.cartProducts[productIndex].qnty += 1;
        return {
          ...state,
          cartProducts: [...state.cartProducts],
        };
      } else {
        const newProduct = { ...action.payload, qnty: 1 };
        return {
          ...state,
          cartProducts: [...state.cartProducts, newProduct],
        };
      }

    case DELETE_CART:
      const filteredCart = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cartProducts: filteredCart,
      };

    case DELETE_ONE_ITEM:
      const index = state.cartProducts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartProducts[index].qnty > 1) {
        const decrementProdcut = (state.cartProducts[index].qnty -= 1);
        return {
          ...state,
          cartProducts: [...state.cartProducts],
        };
      } else if (state.cartProducts[index].qnty === 1) {
        // const decrementProdcut = (state.cartProducts[index].qnty -= 1);
        const data = state.cartProducts.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          cartProducts: data,
        };
      }

    default:
      return state;
  }
};

export default cartReducer;
