import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { login } from "../../redux/auth/action";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Join from '../chat/join';

function Dashboard() {


    return (
        <div>
            <h1>Welcome to Chat app</h1>
            <Join />
        </div>
    )
}
export default Dashboard;