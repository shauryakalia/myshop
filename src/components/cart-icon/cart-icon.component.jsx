import './cart-icon.styles.scss';
import { ReactComponent as ShopIcon } from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <div className='cart-icon-container'>
            <ShopIcon className='shopping-icon' onClick={toggleIsCartOpen}/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;