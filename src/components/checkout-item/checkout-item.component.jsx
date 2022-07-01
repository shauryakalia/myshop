import './checkout-item.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addToCart, removeFromCart, clearItemFromCart} from '../../store/cart/cart.action'

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const clearHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addHandler = () => dispatch(addToCart(cartItems, cartItem));
    const removeHandler = () => dispatch(removeFromCart(cartItems, cartItem));

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