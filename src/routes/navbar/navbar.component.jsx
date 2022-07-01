import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import { NavbarContainer, NavLink, NavLinks, Logo } from './navbar.styles.js';
import { ReactComponent as AppLogo } from '../../logo.svg'
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector";

import { selectIsCartOpen } from "../../store/cart/cart.selector.js";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavbarContainer>
        <Logo to="/">
          <AppLogo className="logo" />
        </Logo>
        <NavLinks>
          <NavLink to="/shop">
            Shop
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/login">
              Login
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        { isCartOpen && <CartDropdown />}
      </NavbarContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;