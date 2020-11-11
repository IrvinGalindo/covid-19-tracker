import React from 'react';
import { Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

const caseTypeColors = {
    cases: {
        hex: "#000cf5",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    }
}

export const sortData = (data) => {
    if (!data) return;

    const sortedData = [...data];
    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);
};

export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}`
        : "+0"

export const drawCircleDataOnMap = (data, casesType = 'cases') =>
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={caseTypeColors[casesType].hex}
            fillColor={caseTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * caseTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="popup__container">
                    <div
                        className="popup__flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    />
                    <div className="popup__name">{country.country}</div>
                    <div className="popup__confirmed">Cases: {numeral(country.cases).format("0.0")}</div>
                    <div className="popup__recovered">Recovered: {numeral(country.recovered).format("0.0")}</div>
                    <div className="popup__deaths">Deaths: {numeral(country.deaths).format("0.0")}</div>
                </div>
            </Popup>

        </Circle>
    ));