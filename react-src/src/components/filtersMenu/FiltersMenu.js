import React, { Component } from 'react';
import { FilterEntry } from './FilterEntry'

import './FiltersMenu.css';

export class FiltersMenu extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onApply = this.onApply.bind(this);
    this.state = { errorFlag : false};
  }

  funcs = {
    Área: this.AreaOnClick.bind(this),
    Preço: this.PrecoOnClick.bind(this),
    Condomínio: this.CondominioOnClick.bind(this),
    IPTU: this.IPTUOnClick.bind(this),
    Quartos: this.QuartosOnClick.bind(this),
    Banheiros: this.BanheirosOnClick.bind(this),
    Garagem: this.GaragemOnClick.bind(this)
  };

  names = {
    Área: "area",
    Preço: "price",
    Condomínio: "condominium_fee",
    IPTU: "iptu",
    Quartos:"rooms",
    Banheiros: "bathrooms",
    Garagem: "garage"
  }

  url_params = {};

  handleChange(e) {
    const name = e.target.value;
    const func = this.funcs[name];
    this.setState({ [name]: func })
  }

  PrecoOnClick(value, type) {
    this.url_params["price-" + type] = value;
  }

  AreaOnClick(value, type) {
    this.url_params["area-" + type] = value;
  }

  CondominioOnClick(value, type) {
    this.url_params["condominium_fee-" + type] = value;
  }

  IPTUOnClick(value, type) {
    this.url_params["iptu-" + type] = value;
  }

  QuartosOnClick(value, type) {
    this.url_params["rooms-" + type] = value;
  }

  BanheirosOnClick(value, type) {
    this.url_params["bathrooms-" + type] = value;
  }

  GaragemOnClick(value, type) {
    this.url_params["garage-" + type] = value;
  }

  close(title) {
    delete this.state[title];
    delete this.url_params[this.names[title]+"-l"];
    delete this.url_params[this.names[title]+"-g"];
    this.setState(this.state);
  }

  onApply() {
    let url = "";
    let flag = false;
    for (let key in this.url_params) {
      let value = this.url_params[key];
      if (isNaN(value)) {
        flag = true;
        break;
      }
      else if (value !== "") {
        url += key + "=" + value + "&"
      }
    }
    if (flag) {
      this.setState({errorFlag : true})
    } 
    else {
      if (url !== "") {
        url = "?" + url.slice(0, -1);
      }
      console.log(url);
      this.props.filter(url);
      this.setState({errorFlag : false});
    }
  }
  render() {
    return (
      <div className="col-md-3 col-sm-10 col-lg-2 text-center" id="menu" >
        <h6 id="title">Filtrar busca</h6>
        <div className="form-group">
          <select className="form-control" id="sel1" onChange={this.handleChange}>
            <option value="" disabled selected>Filtrar por:</option>
            <option>Preço</option>
            <option>Área</option>
            <option>Condomínio</option>
            <option>IPTU</option>
            <option>Quartos</option>
            <option>Banheiros</option>
            <option>Garagem</option>
          </select>
        </div>
        {Object.keys(this.state).map((entry) => {
          if(entry !== "errorFlag" ){
            return (<FilterEntry title={entry} func={this.state[entry]} closeMe={this.close.bind(this)} />);
          }
          else{
            return "";
          }
        })}
        <button type="button" className="btn btn-default btn-sm apply-btn" onClick={this.onApply}>Aplicar</button>
        <p id="title">{this.state.errorFlag ? " Erro: Filtros devem ser números" : ""}</p>
      </div>
    );
  }
}