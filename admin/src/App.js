import React from 'react';
import './App.css';
// import './scss/style.scss'
import {Route, Switch, BrowserRouter } from 'react-router-dom';
import  Layout  from './components/layout/Layout';


const App = () => {
  return (
	<React.Suspense>
		<BrowserRouter>
			<Switch>
				<Route path="/" name="Home" render={(props) => <Layout {...props} />} />
			</Switch>
		</BrowserRouter>
	</React.Suspense>
  );
}

export default App;
