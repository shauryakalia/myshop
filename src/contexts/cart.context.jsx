import { createContext, useState, useEffect } from "react";

const addProductToCart = (cartItems, product) => {
    const item = cartItems.find((cartItem) => cartItem.id === product.id);
    if (item) {
        return cartItems.map((cartItem) => cartItem.id === product.id ? {...cartItem, quantity : cartItem.quantity + 1} : cartItem);
    } 
    return [...cartItems, {...product, quantity: 1}];
}
export const CartContext = createContext(
    {
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartItems: [],
        addToCart: () => {},
        cartCount: 0
    }
)

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false); 
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCount);
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(addProductToCart(cartItems, product));
    };

    const value = {isCartOpen, setIsCartOpen, addToCart, cartItems, cartCount};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}