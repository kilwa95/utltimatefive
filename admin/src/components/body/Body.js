import React from 'react';
import {Route, Switch} from 'react-router-dom';
import routes from '../../routes/routes';
import './Body.css';

const Body = () => {
    return (
        <div className="body">
            <Switch>
                {routes.map((route, index) => () => {
                    return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={(props) => {
                                    <route.provider>
                                        <route.component {...props}/>
                                    </route.provider>
                                }}
                            />
                    );
                })} 
                {/* <Route path="*" element={<Navigate to ="/admin/users" />}/> */}
            </Switch>
        </div>
    );
}
export default Body;