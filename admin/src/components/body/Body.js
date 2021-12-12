import React from 'react';
import {Navigate,Route, Routes } from 'react-router-dom';
import routes from '../../routes/routes';
import UserPage from '../../views/UserPage';
import './Body.css';

const Body = () => {
    return (
        <div className="body">
            <Routes>
                {routes.map((route, index) => () => {
                    return (
                        route.component && (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                element={() => {
                                    <route.provider>
                                        <route.component />
                                    </route.provider>
                                }}
                            />
                        )
                    );
                })}
                {/* <Route path="*" element={<Navigate to ="/admin/users" />}/> */}
            </Routes>
        </div>
    );
}
export default Body;