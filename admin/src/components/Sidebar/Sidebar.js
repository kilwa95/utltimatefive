import React from 'react';
import './Sidebar.css';

const Sidebar = ({children}) => {
  return (
    <div className={"menu"}>
        {children}
    </div>
  );
}

export default Sidebar;
