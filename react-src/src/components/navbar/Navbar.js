import React, { Component } from 'react';
import { LogoView } from './LogoView';
import { CsvBtnView } from './CsvBtnView';
import { Info } from './Info';

import './Navbar.css';


export class  Navbar extends Component{
  render(){
    return(
        <div className="row" id="Navbar">
          <LogoView/>
          <Info/>
          <CsvBtnView click={this.props.button}/>
        </div>
    );
  }
}
