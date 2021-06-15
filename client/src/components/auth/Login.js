import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { login } from "../../redux/auth/api";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

function Login() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    const handleLogin = () => {
        dispatch(login({ email, password }))
    }
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    return (
        <div>
            <h1>Login Page</h1>
            <Form onSubmit={handleLogin}>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Title' value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Field>
                <Button type='submit'>Login</Button>
            </Form>
        </div>
    )
}
export default Login;