import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ListNav from '../Sidebar/listNav/ListNav';
import Nav from '../Sidebar/nav/Nav';
import navs from '../../routes/navs';
import Wrapper from '../wrapper/Wrapper';
import Header from '../header/Header';
import NavSearch from '../navSearch/NavSearch';
import Body from '../body/Body';
import './Layout.css';

const Layout = (props) => {
    return (
        <div className="layout">
            <Sidebar>
                <ListNav>{navs.map((nav, index) => <Nav key={index} name={nav.name} to={nav.to} icon={nav.icon} />)}</ListNav>
            </Sidebar>
            <Wrapper>
                <Header />
                <NavSearch />
                <Body />
            </Wrapper>
        </div>
    );
}
export default Layout;