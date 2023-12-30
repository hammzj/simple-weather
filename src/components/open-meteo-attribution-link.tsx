import React from 'react';
import {Link as MuiLink, Typography} from '@mui/material';
import {OPEN_METEO_HOMEPAGE} from "../constants";


export default function OpenMeteoAttributionLink(): React.ReactElement {
    return (
        <MuiLink
            sx={{color: 'black', textDecorationColor: 'black'}}
            href={OPEN_METEO_HOMEPAGE}>
            <Typography noWrap={true}> Weather data by Open-Meteo.com</Typography>
        </MuiLink>
    )
}
