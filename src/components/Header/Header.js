import React from 'react';
import logo from'../../images/logo.png';
import './Header.css';


const Header = () => {
    return (
        <div className="Header">
                <img src={logo}></img>
                <nav>
            <a href="/shop">Shop</a>
            <a href="/review">Order Review</a>
            <a href="/inventory">Manage Ineventory</a>
          </nav>
        </div>
    );
};

export default Header;