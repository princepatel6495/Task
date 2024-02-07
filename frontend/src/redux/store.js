import { createStore } from "redux";
import reducer from "./reducer";

const persistedState = JSON.parse(localStorage.getItem("my-store")) || {};

const initialState = {
  cart: persistedState.cart || [],
};

const store = createStore(reducer, initialState);

store.subscribe(() => {
  localStorage.setItem("my-store", JSON.stringify(store.getState()));
});

export default store;
