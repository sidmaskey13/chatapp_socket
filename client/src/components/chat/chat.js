import React, { useEffect, useState } from 'react';

import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import io from 'socket.io-client'
const queryString = require('query-string');

const Chat = ({ location }) => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const ENDPOINT = 'localhost:4000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        const socket = io(ENDPOINT);

        setName(name)
        setRoom(room)
        socket.emit('join', { name, room })
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT, location.search])

    return (
        <div>
            <h1>Chat</h1>

        </div>
    )
}
export default Chat;