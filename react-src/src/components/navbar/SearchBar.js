import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';

export class SearchBar extends Component{
  render(){
    return(
        <div className="col-sm-12 col-md-6">
            <input type="text" placeholder="Buscar Localidades..." id="search"></input>
            <span id="search-icon"><FaSearch/></span>
        </div>
    );
  }
}