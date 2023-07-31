import React, {FC, PropsWithChildren} from 'react';
import {
    Outlet,
} from "react-router-dom";
import PagesTemplate from '../../components/Templates/PagesTemplate/PagesTemplate';


const PanelContainer: FC = () => {
    return (
            <Outlet/>
    )
}

export default PanelContainer
