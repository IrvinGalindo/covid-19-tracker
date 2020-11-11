import React, { useState, useEffect } from 'react';

import CovidInfoCountry from './Components/Slides/CovidInfoCountry/CovidInfoCountry';
import GeneralInfo from './Components/Slides/GeneralInfo/GeneralInfo';

import { sortData } from './util';

import './App.css';

function App() {
  const [casesType, SetCasesType] = useState('cases');
  const [countriesTableData, setCountriesTableData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then(response => response.json())
      .then(data => {
        const countries = data.map(country => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }));

        setCountries(countries);
        setMapCountries(data);

        const sortedData = sortData(data);
        setCountriesTableData(sortedData);
      });

  }, [setCountries, setCountriesTableData]);

  return (
    <div className="app">
      <CovidInfoCountry
        countries={countries}
        mapCountries={mapCountries}
        getCasesType={(casesType) => SetCasesType(casesType)}
      />
      <GeneralInfo
        countriesTableData={countriesTableData}
        casesType={casesType}
      />
    </div>
  );
}

export default App;
