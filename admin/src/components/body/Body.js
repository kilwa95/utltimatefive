import React from 'react';
import {BrowserRouter,Redirect,Route, Switch} from 'react-router-dom';
import UserPage from '../../views/UserPage';

import './Body.css';

const Body = () => {
    return (
        <div className="body">
            <React.Suspense>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/admin/users" name="Home" render={(props) => <UserPage {...props} />} />
                    </Switch>
                        <Redirect from="/admin" to="/admin/users" />
                </BrowserRouter>
            </React.Suspense>
        </div>
    );
}
export default Body;