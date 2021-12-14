import React from 'react';

const TableListHeader = ({keys}) => {
    const headers = keys[0]
    return (
        <div className="table-list-header">
        {headers.map((key, index) => (
            <div className="table-list-header-item">
                <div key={index} className="table-list-header-item-name">{key}</div>
                <div></div>
            </div>
        ))}
    </div>
    );
}

export default TableListHeader;