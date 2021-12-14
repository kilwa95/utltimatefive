import React from 'react';
import TableListHeader from './TableListHeader';
import TableListRow from './TableListRow';

const TableList = ({items}) => {
  return (
    <div className="table-list">
      <TableListHeader keys={items.map(item =>Object.keys(item))} />
      <TableListRow items={items} />
    </div>
  );
}

export default TableList;