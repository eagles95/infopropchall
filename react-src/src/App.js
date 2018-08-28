import React, { Component } from 'react';
import axios from "axios";
import './App.css';


import { Navbar } from './components/navbar/Navbar';
import { FiltersMenu } from './components/filtersMenu/FiltersMenu';
import { MapComponent } from './components/map/MapComponent';


class App extends Component {
  constructor() {
    super();
    this.state = {
      url: "api/default",
      imoveis: []
    }
  }

  file = "";


  uploadOnClick(e) {
    let fileName = e.target.files[0].name;
    if (fileName.split('.').pop() !== "csv") {
      alert(' Erro : Arquivo deve ser no formato .csv');
    }
    else {
      console.log(fileName);
      const fd = new FormData();
      fd.append('file', e.target.files[0], "uploaded");
      axios.post("api/upload", fd)
        .then(res => {
          this.file = "uploaded";
          let newUrl = "api/" + this.file;
          axios.get(newUrl)
            .then(res => {
              this.setState({ imoveis: res.data })
            });
        })
        .catch(err => {
          alert(" Erro : Arquivo .csv inválido/O header desse arquivo é o mesmo do exemplo?");
        });
    }
  }

  applyFilter(url) {
    let newUrl = "api/" + this.file + url;
    axios.get(newUrl)
      .then(res => {
        this.setState({ imoveis: res.data })
      });
  }
  componentWillMount() {
    console.log(this.state.url);
    this.file = "default";
    axios.get(this.state.url)
      .then(res => {
        this.setState({ imoveis: res.data })
      });
  }

  render() {
    return (
      <div className="App-div">
        <Navbar button={this.uploadOnClick.bind(this)} />
        <div className="row" id="row-2nd">
          <FiltersMenu filter={this.applyFilter.bind(this)} />
          <MapComponent imoveis={this.state.imoveis} />
        </div>
      </div>
    );
  }
}

export default App;
