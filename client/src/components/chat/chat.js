import React, { useEffect, useState } from 'react';

import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import io from 'socket.io-client'
const queryString = require('query-string');
let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:4000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

        setRoom(room);
        setName(name)

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages)

    return (
        <div>
            <h1>Chat</h1>
            <ul>{messages ? messages.map(i => <li key={i}>{i.user}: {i.text}</li>) : "No messages"}</ul>
            <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null} />

        </div>
    )
}
export default Chat;