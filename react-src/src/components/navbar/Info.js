import React from 'react';
import { FaGithub } from 'react-icons/fa';
import './Navbar.css';

export const Info = (props) => {
    return(
        <div className="col-sm-12 col-md-6">
         <h5>InfoProp Rucruitment Challenge - joaofcdias@gmail.com <br/> <a className="link" href="https://github.com/eagles95/"> Code : <FaGithub/></a> </h5>
        </div>
    );
}