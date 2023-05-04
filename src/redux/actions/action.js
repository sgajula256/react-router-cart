import { ADD_CART, DELETE_CART, DELETE_ONE_ITEM } from "./actionTypes";

export const ADD = (item) => {
  return {
    type: ADD_CART,
    payload: item,
  };
};

export const DELETE = (id) => {
  return {
    type: DELETE_CART,
    payload: id,
  };
};

export const DELETE_ONE = (item) => {
  return {
    type: DELETE_ONE_ITEM,
    payload: item,
  };
};
