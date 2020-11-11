import React from 'react';
import numeral from 'numeral';
import { Card, CardContent } from '@material-ui/core';

import Table from '../../Table/Table';
import LineGraph from '../../LineGraph/LineGraph';

import './GeneralInfo.scss';

function GeneralInfo({ countriesTableData, casesType }) {
    return (
        <Card className='generalInfo'>
            <CardContent>
                <h3>Live Cases by Country</h3>
                <Table countriesTableData={countriesTableData} />
                <h3>Worldwide new {casesType}</h3>
                <LineGraph className='graph' casesType={casesType} />
            </CardContent>

        </Card >
    )
}

export default GeneralInfo;
