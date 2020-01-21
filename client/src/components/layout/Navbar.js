import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../redux/user/user.actions"

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {

    const authLinks = (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link className="nav-link" to="/profiles">Lancers</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/posts">Posts</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
            <i className="fas fa-user" /> {" "}
            <span className="hide-sm">Dashboard</span>
            </Link>
        </li>
        <li className="nav-item">
        <a onClick={logout} className="nav-link" href="#!">
        <i className="fas fa-sign-out-alt" /> {" "}
        <span className="hide-sm">Logout</span>
        </a>
    </li>
    </ul>
    );

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link className="nav-link" to="/profiles">Lancers</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
        </li>
    </ul>
    );

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-dark mb-3">
        <div className="container">
            <Link className="navbar-brand" to={isAuthenticated ? "/dashboard" : "/"}>ELance</Link>
            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                {!loading && (
                    <Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
                )}
            </div>
        </div>
    </nav>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);
