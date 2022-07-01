import {CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.js';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector.js';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const goToCheckout = () => {
        navigate('/checkout')
    } 
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((cartItem) => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckout}>CHECKOUT</Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown