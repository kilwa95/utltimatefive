import React from 'react';
import './Buttom.css';

const Buttom = ({text,onClick}) => {
  return (
    <button className="buttom" onClick={onClick}>{text}</button>
  );
}

export default Buttom;