import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Dataset from './components/Dataset/Dataset';

function App() {
    return (
        <Router>
            <Route exact path='/' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/sensordata' component={Dataset} />
        </Router>
    );
}

export default App;
