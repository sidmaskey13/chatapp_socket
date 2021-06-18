import React, { useEffect, useState } from 'react';

import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import io from 'socket.io-client'
import { fetchMessagesRoom } from '../../redux/message/api'
const queryString = require('query-string');
let socket;

const Chat = ({ location }) => {
    const user = useSelector(state => state.auth.user)
    const apiMessages = useSelector(state => state.messages.messages)
    // console.log(apiMessages)

    const dispatch = useDispatch()
    // console.log(user)

    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([]);
    const ENDPOINT = 'localhost:4000'
    const room_id = queryString.parse(location.search).room;
    const user_id = user ? user._id : ""

    useEffect(() => {

        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

        setRoom(room_id);
        setName(user ? user.name : "")

        socket.emit('join', { user_id: user ? user._id : "", name: user ? user.name : "", room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
            console.log(users)
        });
        console.log(users)

    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', { message, user_id, room_id }, () => setMessage(''));
        }
    }

    return (
        <div>
            <h1>Chat</h1>
            Current online {users ? users.map(i => <p>{i.name}</p>) : ""}
            {name ? <h5>Welcome {user ? user.name : ""}</h5> : ""}
            {/* <ul>{apiMessages ? apiMessages.map(i => <li key={i}>{i.sender.name}: {i.text}</li>) : "No messages"}</ul> */}
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