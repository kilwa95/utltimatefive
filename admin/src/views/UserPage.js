import React from 'react';
import Table from '../components/table/Table';
import TableTitle from '../components/table/TableTitle';
import TableList from '../components/table/TableList';

const UserPage = () => {
    return (
        <Table>
            <TableTitle title={'List entreprise'}/>
            <TableList/>
        </Table>
    );
};
export default UserPage;