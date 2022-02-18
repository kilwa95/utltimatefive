import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';


const Nav = ({name,to,icon}) => {
    return (
        <nav className="nav">
            <div className="nav-text">
                {/* <image className="nav-text-logo" src={icon}/> */}
                <Link to={to} className="nav-text-name">{name}</Link>
            </div>
        </nav>
    );
}

export default Nav;