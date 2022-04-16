import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import './navbar.styles.scss';
import { ReactComponent as Logo } from '../../logo.svg'

const Navbar = () => {
    return (
      <Fragment>
          <div className="navbar">
              <Link className="logo-container" to="/">
                <Logo className="logo" />
              </Link>
              <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    Shop
                </Link>
                <Link className="nav-link" to="/login">
                    Login
                </Link>
              </div>
          </div>
        <Outlet />
      </Fragment>
    );
};

export default Navbar;