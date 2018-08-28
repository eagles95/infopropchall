import React, { Component } from 'react';
import { FaLessThanEqual } from 'react-icons/fa';
import { FaGreaterThanEqual } from 'react-icons/fa';
import {FaTimes} from 'react-icons/fa'
import './FiltersMenu.css';

export class FilterEntry extends Component{
    state = {
        valueLt : "",
        valueGt : ""
    }
    onChangeLt(e){
        this.setState({valueLt : e.target.value});
        this.props.func(e.target.value,"l");
    }
    onChangeGt(e){
        this.setState({valueGt : e.target.value});
        this.props.func(e.target.value,"g");
    }
    close(){
        this.props.closeMe(this.props.title);
    }
    render(){
        return (
            <div className="input-div">
            {this.props.title}
            <button type="button" className="x-btn" onClick={this.close.bind(this)}><FaTimes/></button>
            <br/>
            <span><FaLessThanEqual/></span>
            <input type="text" className="input-filter" value={this.state.valueLt} onChange={this.onChangeLt.bind(this)}></input>
            <br/>
            <span><FaGreaterThanEqual/></span>
            <input type="text" className="input-filter" value={this.state.valueGt} onChange={this.onChangeGt.bind(this)}></input>
         </div>
        );    
    }
}