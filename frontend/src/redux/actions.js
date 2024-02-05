export const addToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const removeFromCart = (product) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: product,
  };
};

export const incrementQuantity = (product) => {
  return {
    type: "INCREMENT_QUANTITY",
    payload: product,
  };
};

export const decrementQuantity = (product) => {
  return {
    type: "DECREMENT_QUANTITY",
    payload: product,
  };
};
export const clearCart = (product) => {
  return {
    type: "CLEAR_CART",
    payload: [],
  };
};
