import { CART_ACTION_TYPES } from "./cart.types";
import { createAction} from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

const addProductToCart = (cartItems, product) => {
    const item = cartItems.find((cartItem) => cartItem.id === product.id);
    if (item) {
        return cartItems.map((cartItem) => cartItem.id === product.id ? {...cartItem, quantity : cartItem.quantity + 1} : cartItem);
    } 
    return [...cartItems, {...product, quantity: 1}];
}

const removeProductFromCart = (cartItems, product) => {
    const item = cartItems.find((cartItem) => cartItem.id === product.id); 
    if (item.quantity === 1) {
        return cartItems.filter(cartItem => item.id !== cartItem.id);
    } else {
        return cartItems.map((cartItem) => cartItem.id === product.id ? {...cartItem, quantity : cartItem.quantity - 1} : cartItem);
    }
}

const clearProductFromCart = (cartItems, product) => {
    return cartItems.filter(cartItem => product.id !== cartItem.id);
}

export const addToCart = (cartItems, product) => {
    const newCartItems = addProductToCart(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeFromCart = (cartItems, product) => {
    const newCartItems = removeProductFromCart(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, product) => {
    const newCartItems = clearProductFromCart(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}