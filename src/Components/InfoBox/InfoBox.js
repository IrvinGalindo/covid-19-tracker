import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import './InfoBox.scss';

function InfoBox({ title, cases, total, active, isRed, isBlue, ...props }) {
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && 'infoBox--selected'} ${isBlue && 'infoBox--blue'} ${isRed && 'infoBox--red'}`} >
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className={`infoBox__cases ${isBlue && 'infoBox--blue'} ${isRed && 'infoBox--red'}`}>{cases}</h2>

                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox

