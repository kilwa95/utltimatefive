import React from 'react';
import Buttom from '../buttom/Buttom';


const TableTitle = ({ title}) => {
    return (
        <div className="table-title">
            <div className="table-title-name">List entreprise </div>
            <div className="table-title-button">
                <Buttom text="Ajouter une entreprise" />
            </div>
    </div>
    );
}

export default TableTitle;