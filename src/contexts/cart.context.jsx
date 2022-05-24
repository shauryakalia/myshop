import { type } from "@testing-library/user-event/dist/type";
import { createContext, useReducer } from "react";
import {createAction} from '../utils/reducer/reducer.utils';

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

const initialState = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotalPrice: 0,
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };

        default:
            throw new Error(`unhandled type ${type}`)
    }
}

export const CartContext = createContext(
    {
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartItems: [],
        addToCart: () => {},
        removeFromCart: () => {},
        cartCount: 0,
        cartTotalPrice: 0,
        clearItemFromCart: () => {}
    }
)

export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false); 
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotalPrice, setCartTotalPrice] = useState(0);

    // useEffect(() => {
    //     const newCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //     setCartCount(newCount);
    // }, [cartItems]);

    // useEffect(() => {
    //     const newTotalPrice = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    //     setCartTotalPrice(newTotalPrice);
    // }, [cartItems]);
    
    const [{isCartOpen, cartItems, cartCount, cartTotalPrice }, dispatch] = useReducer(cartReducer, initialState)

    const updateCartItemsReducer = (newCartItems) => {
        const newCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newTotalPrice = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartCount: newCount, cartTotalPrice: newTotalPrice} ));  
    }

    const addToCart = (product) => {
        const newCartItems = addProductToCart(cartItems, product);
        updateCartItemsReducer(newCartItems);
    };

    const removeFromCart = (product) => {
        const newCartItems = removeProductFromCart(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (product) => {
        const newCartItems = clearProductFromCart(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {isCartOpen, setIsCartOpen, addToCart, cartItems, cartCount, cartTotalPrice, removeFromCart, clearItemFromCart};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}