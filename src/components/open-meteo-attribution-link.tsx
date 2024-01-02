import React from 'react';
import TextLink from "./text.link";
import {OPEN_METEO_HOMEPAGE} from "../constants";

export default function OpenMeteoAttributionLink(): React.ReactElement {
    return <TextLink href={OPEN_METEO_HOMEPAGE}>Weather data by Open-Meteo.com</TextLink>;
}
