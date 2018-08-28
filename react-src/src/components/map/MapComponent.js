import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import './MapStyle.css';


export class MapComponent extends Component {
    start = {
        lat: -23.5969,
        lng: -46.6699,
        zoom: 13,
    }
    render() {
        let position = [this.start.lat, this.start.lng];
        if (this.props.imoveis.length !== 0) {
            position = [this.props.imoveis[0]["latitude"], this.props.imoveis[0]["longitude"]]
        }
        return (

            <div className="col-lg-10 col-md-9 col-12 map-div">
                <Map center={position} zoom={this.start.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup>
                        {this.props.imoveis.map((imovel) => {
                            let title = imovel["condominio"];
                            if(title === null){
                                title = imovel["rua"];
                            }

                            return (
                                <Marker position={[imovel["latitude"], imovel["longitude"]]}>
                                    <Popup>
                                        <div>
                                            <b>{title}</b>
                                            <ul style={{ columns: 2 }} className="list-unstyled">
                                                <li>Preço: {imovel["price"] > 0 ? imovel["price"] : "Não informado"}</li>
                                                <li>Área: {imovel["area"] > 0 ? imovel["area"] : "Não informado"}</li>
                                                <li>Condo: {imovel["condominium_fee"] > 0 ? imovel["condominium_fee"] : "Não informado"}</li>
                                                <li>IPTU: {imovel["iptu"] > 0 ? imovel["iptu"] : "Não informado"}</li>
                                                <li>Quartos: {imovel["rooms"] > 0 ? imovel["rooms"] : "Não informado"}</li>
                                                <li>Banheiros: {imovel["bathrooms"] > 0 ? imovel["bathrooms"] : "Não informado"}</li>
                                                <li>Vagas Garagem: {imovel["garage"] > 0 ? imovel["garage"] : "Não informado"}</li>
                                            </ul>
                                            <p>{imovel['agent']}</p>
                                            <a href={imovel['url']}>Fonte</a>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MarkerClusterGroup>
                </Map>
            </div>
        );
    }
}
