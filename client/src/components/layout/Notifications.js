import React, { useEffect, useState } from 'react';

import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';


function Noti() {
    const notifications = useSelector(state => state.notifications)

    useEffect(() => {
        if (notifications.message) {
            if (notifications.type == 'success') {
                toast.success(notifications.message);
            }
            else {
                toast.error(notifications.message);
            }
        }

    }, [notifications])


    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
            />
        </div>
    )
}

export default Noti;
