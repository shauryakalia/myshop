import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { NavbarContainer, NavLink, NavLinks, Logo } from './navbar.styles.js';
import { ReactComponent as AppLogo } from '../../logo.svg'
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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