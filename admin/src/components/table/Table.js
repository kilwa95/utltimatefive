import React from 'react';
import './Table.css';

const Table = ({children}) => {
    return (
        <div className="table">{children}</div>
    );
}

export default Table;