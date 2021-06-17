import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { fetchAllRooms } from '../../redux/room/api'

function Join() {
    const roomList = useSelector(state => state.rooms.roomList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllRooms());
    }, [])

    return (
        <div>
            <h1>Join</h1>
            {roomList ? roomList.map(i =>
                <p>
                    {i.name}
                    <Link to={`/chat?room=${i._id}`}>
                        <Button type="submit">Submit</Button>
                    </Link>
                </p>)
                : ""}
        </div >
    )
}
export default Join;