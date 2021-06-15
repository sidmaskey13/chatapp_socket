import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Card, Icon, Pagination, Input, Grid, Button } from 'semantic-ui-react'
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