import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import { drawCircleDataOnMap } from '../../util';

import 'leaflet/dist/leaflet.css';
import './Map.scss';

function Map({ countries, casesType, center, zoom }) {

    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {drawCircleDataOnMap(countries, casesType)}
            </LeafletMap>
        </div >
    )
}

export default Map


