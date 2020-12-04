import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Forgot from './pages/Forgot';
import Signup from './pages/Signup';
import Members from './pages/Members';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import AddChild from './pages/AddChild';
import Donations from './pages/Donations';

import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Footer from './components/Footer';

import API from './utils/API';
import { GlobalContextProvider } from './utils/GlobalContext';

import './App.css';

const PrivateRoute = ({ component, ...options }) => {
    if (API.getCurrentUser()) {
        return <Route {...options} component={component} />;
    }
    return <Redirect to={'/'} />;
};

PrivateRoute.propTypes = {
    options: PropTypes.object,
    component: PropTypes.func.isRequired,
};

const App = () => (
    <GlobalContextProvider>
        <Switch>
            <Route exact path="/Forgot" />
            <Route exact path="/Signup" />
            <Route exact path="/" />
            <Route component={Navbar} />
        </Switch>
        <Switch>
            <PrivateRoute exact path="/Members" component={Members} />
            <PrivateRoute exact path="/Profile" component={Profile} />
            <PrivateRoute exact path="/AddChild" component={AddChild} />
            <PrivateRoute exact path="/Donations" component={Donations} />
            <Route exact path="/Forgot" component={Forgot} />
            <Route exact path="/Signup" component={Signup} />
            <Route path="/" component={Welcome} />
        </Switch>
        <Switch>
            <Route exact path="/" />
            <Route exact path="/Forgot" />
            <Route exact path="/Signup" />
            <Route component={Chat} />
        </Switch>
        <Footer />
    </GlobalContextProvider>
);

export default App;
