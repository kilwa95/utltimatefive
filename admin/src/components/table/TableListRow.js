import React from 'react';

const TableListRow = ({items}) => {
    console.log(items)
    return (
        <div className="table-list-row">
            <div className="table-list-row-cell">
                <div className="table-list-row-cell-info">
                    {items.map(item =>(
                    <div className="table-list-row-cell-info-title">
                        {item.id}
                    </div>
                    ))}
                </div>
                <div className="table-list-row-cell-right"></div>
            </div>
        </div>
    )
}

export default TableListRow;