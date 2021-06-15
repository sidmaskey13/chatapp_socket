import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

function Join() {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")



    return (
        <div>
            <h1>Join</h1>
            <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} value={name} />
            <input type="text" placeholder="Room" onChange={e => setRoom(e.target.value)} value={room} />
            <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                <Button type="submit">Submit</Button>
            </Link>
        </div >
    )
}
export default Join;