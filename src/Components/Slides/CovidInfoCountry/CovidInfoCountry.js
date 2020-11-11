import React, { useState, useEffect } from 'react';
import {
    FormControl,
    Select,
    MenuItem,
} from '@material-ui/core';

import InfoBox from '../../InfoBox/InfoBox';
import LeafletMap from '../../Map/Map';

import { prettyPrintStat } from '../../../util';

import './CovidInfoCountry.scss';

function CovidInfoCountry({ countries, mapCountries, getCasesType }) {
    const [country, setCountry] = useState('worldwide')
    const [countryInfo, setCountryInfo] = useState('');

    const [mapCenter, setMapCenter] = useState([23, -102]);
    const [mapZoom, setMapZoom] = useState(3);
    const [casesType, setCasesType] = useState('cases');


    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then(response => response.json())
            .then(data => {
                setCountryInfo(data);
            });

    }, [setCountryInfo]);

    const onCountryChange = async (countryCode) => {
        setCountry(countryCode);
        const url = countryCode === 'worldwide'
            ? 'https://disease.sh/v3/covid-19/all'
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`

        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setCountryInfo(data);
                setMapCenter([
                    data.countryInfo.lat,
                    data.countryInfo.long
                ]);
                setMapZoom(4);
            });
    };

    const handleInfoBoxOnClick = (casesType) => {
        setCasesType(casesType);
        getCasesType(casesType);

    }

    return (
        <div className="CovidInfoCountry">
            <div className="CovidInfoCountry__header">
                <h1>COVID-19 TRACKER</h1>
                <FormControl className="CovidInfoCountry__dropdown">
                    <Select
                        variant="outlined"
                        value={country}
                        onChange={(event) => onCountryChange(event.target.value)}
                    >
                        <MenuItem value="worldwide">Worldwide</MenuItem>
                        {
                            countries.map(country => (
                                <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </div>
            <div className="CovidInfoCountry__stats">
                <InfoBox
                    isBlue
                    active={casesType === 'cases'}
                    onClick={() => handleInfoBoxOnClick('cases')}
                    title="Coronavirus Cases"
                    cases={prettyPrintStat(countryInfo.todayCases)}
                    total={prettyPrintStat(countryInfo.cases)}
                />
                <InfoBox
                    active={casesType === 'recovered'}
                    onClick={(e) => handleInfoBoxOnClick('recovered')}
                    title="Recovered"
                    cases={prettyPrintStat(countryInfo.todayRecovered)}
                    total={prettyPrintStat(countryInfo.recovered)}
                />
                <InfoBox
                    isRed
                    active={casesType === 'deaths'}
                    onClick={(e) => handleInfoBoxOnClick('deaths')}
                    title="Deaths"
                    cases={prettyPrintStat(countryInfo.todayDeaths)}
                    total={prettyPrintStat(countryInfo.deaths)}
                />
            </div>
            <LeafletMap casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
        </div>
    )
}

export default CovidInfoCountry;
