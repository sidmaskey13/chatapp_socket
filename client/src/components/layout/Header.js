import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'semantic-ui-react'
import { logOut } from "../../redux/auth/api";


function Header() {
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logOut())
    }
    const guestLink = (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li> */}
            </ul>
            <ul className="navbar-nav my-2 ml-auto">

                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        </div>
    );
    const authLink = (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <Link to="/dashboard">
                    <li className="nav-item">
                        <a className="nav-link" href="">Dashboard</a>
                    </li>
                </Link>
                {user ? user.userType = 'admin' ?
                    <Link to="/users">
                        <li className="nav-item">
                            <a className="nav-link" href="">Users</a>
                        </li>
                    </Link>
                    : "" : ""}
            </ul>
            <ul className="navbar-nav my-2 ml-auto">
                <span className="navbar-text mr-3">
                    <strong>{user ? `Welcome ${user.name}` : ""}</strong>
                </span>
                <Button onClick={handleLogout}>Logout</Button>

            </ul>
        </div>

    );
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#"><Link className="nav-link" to="/">BoilerPlate</Link></a>
                {isAuthenticated ? authLink : guestLink}
            </nav>
        </div>
    )
}
export default Header;