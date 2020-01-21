import React, {Fragment, useEffect} from 'react';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import store from "./redux/store"
import {loadUser} from "./redux/user/user.actions"
import setAuthToken from "./utils/setAuthToken"
import './App.css';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from "./components/profile-forms/EditProfile"
import AddExperience from "./components/profile-forms/AddExperience"
import CreateProfile from './components/profile-forms/CreateProfile';
import Profiles from "./components/profiles/Profiles";
import PrivateRoute from './components/routing/PrivateRoute';
import AddEducation from './components/profile-forms/AddEducation';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';



if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
    <Router>
    <Fragment>
    <Navbar />
    <Route exact path="/" component={Landing} />
    <Alert />
    <Switch>
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/profiles" component={Profiles} />
    <Route exact path="/profile/:id" component={Profile} />

    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/create-profile" component={CreateProfile} />
    <PrivateRoute exact path="/edit-profile" component={EditProfile} />
    <PrivateRoute exact path="/add-experience" component={AddExperience} />
    <PrivateRoute exact path="/add-education" component={AddEducation} />
    <PrivateRoute exact path="/posts" component={Posts} />
    <PrivateRoute exact path="/posts/:id" component={Post} />

    </Switch>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
