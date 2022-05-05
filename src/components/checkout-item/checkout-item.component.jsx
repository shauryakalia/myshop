import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const {clearItemFromCart, addToCart, removeFromCart} = useContext(CartContext);

    const clearHandler = () => clearItemFromCart(cartItem);
    const addHandler = () => addToCart(cartItem);
    const removeHandler = () => removeFromCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}></img>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeHandler}>&#10094;</div>
                <span className='value'>
                    {quantity}
                </span>
                <div className='arrow' onClick={addHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;