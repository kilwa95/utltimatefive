import React from 'react';
import Table from '../components/table/Table';
import TableTitle from '../components/table/TableTitle';
import TableList from '../components/table/TableList';

const UserPage = () => {
    const users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'John@gmail.com',
            phone: '0643358066',
            address: '123, Main Street, New York, USA',
            role: 'Admin',
            status: 'Active',
        },
        {
            id: 2,
            name: 'pierre Doe',
            email: 'pierre@gmail.com',
            phone: '0643358066',
            address: '123, Main Street, New York, USA',
            role: 'Admin',
            status: 'Active',
        },
    ];
    return (
        <Table>
            <TableTitle title={'List entreprise'}/>
            <TableList items={users}/>
        </Table>
    );
};
export default UserPage;