import { createContext, useState, useEffect } from "react";

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
    const [isCartOpen, setIsCartOpen] = useState(false); 
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        const newCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCount);
    }, [cartItems]);

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotalPrice(newTotalPrice);
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(addProductToCart(cartItems, product));
    };

    const removeFromCart = (product) => {
        setCartItems(removeProductFromCart(cartItems, product));
    }

    const clearItemFromCart = (product) => {
        setCartItems(clearProductFromCart(cartItems, product));
    }

    const value = {isCartOpen, setIsCartOpen, addToCart, cartItems, cartCount, cartTotalPrice, removeFromCart, clearItemFromCart};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}