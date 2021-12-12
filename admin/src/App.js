import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Layout  from './components/layout/Layout';


const App = () => {
  return (
	  <div className="App">
		<Router>
			<Routes>
				<Route path="/" element={<Layout />} />
			</Routes>
		</Router>
	  </div>
  );
}

export default App;
