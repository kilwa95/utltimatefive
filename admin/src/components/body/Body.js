import React from 'react';
import {BrowserRouter,Redirect,Route, Switch} from 'react-router-dom';
import UserPage from '../../views/UserPage';
import MatchPage from '../../views/MatchPage';
import UserProvider from '../../contexts/UserContext';
import MatchProvider from '../../contexts/MatchContext';


import './Body.css';

const Body = () => {
    return (
        <div className="body">
            <React.Suspense>
                <BrowserRouter>
                    <Switch>
                        {/* <UserProvider>
                            <Route exact path="/admin/users" name="users" render={(props) => <UserPage {...props} />} />
                        </UserProvider> */}
                        <MatchProvider>
                            <Route exact path="/admin/matches" name="Matchs" render={(props) => <MatchPage {...props} />} />
                        </MatchProvider>
                    </Switch>
                        {/* <Redirect from="/admin" to="/admin/users" /> */}
                </BrowserRouter>
            </React.Suspense>
        </div>
    );
}
export default Body;