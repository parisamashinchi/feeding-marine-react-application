import React, {FC} from 'react';
import {
    Outlet
} from "react-router-dom";

const AuthContainer: FC = () => {
    return (
        <Outlet/>
    )
}

export default AuthContainer
