import {useState} from 'react';
import { Outlet } from "react-router-dom";

function Root() {
    return(
        <div className="full_page">
            
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )

}

export default Root;