import React from 'react';
import './ListNav.css';

const ListNav = ({children}) => {
    return (
        <div className="list-nav">
            {children}
        </div>
    );
}

export default ListNav;