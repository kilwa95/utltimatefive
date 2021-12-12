import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ListNav from '../Sidebar/listNav/ListNav';
import Nav from '../Sidebar/nav/Nav';
import navs from '../../routes/navs';

const Layout = () => {
    return (
        <div>
            <Sidebar>
                <ListNav>{navs.map((nav, index) => <Nav key={index} name={nav.name} to={nav.to} icon={nav.icon} />)}</ListNav>
            </Sidebar>
        </div>
    );
}
export default Layout;