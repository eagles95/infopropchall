import React from 'react';
import logo from './pls.png';


export const LogoView = () => {
    return(
        <div className="col-sm-12 col-md-3">
            <img src={logo} alt="Logo" id="logo" />
        </div>
    );
}