import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <Link to="/" className="header__link">
                <div className="header__logo">MOVIE APP</div>
            </Link>
            <div className="header__chip">⭐ Star on Github</div>
        </div>
    )
}

export default Header;
