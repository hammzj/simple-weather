import React, {useContext} from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Switch,} from '@mui/material';
import {isDarkModeSettingsEnabled} from "./utils";
import {SETTINGS_KEY_NAMES} from "../constants";
import {TemperatureUnit, WindSpeedUnit, PrecipitationUnit} from '../services/open_meteo_api/forecast_api';
import {ColorModeContext} from "../contexts";

const EnableDarkModeSwitch = (): React.ReactElement => {
    const colorMode = useContext(ColorModeContext);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked ? 'dark' : 'light';
        console.debug('updated local storage:', event.target.name, value);
        localStorage.setItem(SETTINGS_KEY_NAMES.COLOR_MODE, value);
        colorMode.setColorMode();
    };

    return (
        <FormControlLabel
            label="Enable dark mode"
            control={
                <Switch onChange={handleChange}
                        color='secondary'
                        defaultChecked={isDarkModeSettingsEnabled()}
                        name={SETTINGS_KEY_NAMES.COLOR_MODE}/>}
        />)
}

/*
 * Generic component that creates radio choices from a selection of values.
 * In this case, the values are pulled from the TypeScript enums that represent
 * the options allowed for hitting the Forecast API's `getWeather` call
 */
const SettingsRadioGroup = ({
                                settingsKeyName,
                                defaultValue,
                                formLabel,
                                units
                            }): React.ReactElement => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.debug('updated local storage:', event.target.name, event.target.value);
        localStorage.setItem(event.target.name, event.target.value);
    };


    return (
        <FormControl
            color='secondary'>
            <FormLabel id={`${settingsKeyName}-unit-radio-group`}>{formLabel}</FormLabel>
            <RadioGroup
                name={settingsKeyName}
                aria-labelledby={`${settingsKeyName}-unit-radio-group-label`}
                onChange={handleChange}
                defaultValue={defaultValue}
                row
            >
                {Object.keys(units).map(unit => {
                    return <FormControlLabel key={unit} value={unit} control={<Radio color='secondary'/>} label={unit}/>
                })}
            </RadioGroup>
        </FormControl>
    )
}


export default function SettingsMenu(): React.ReactElement {
    return (<Stack
        id='settings-menu'
        direction='column'
        alignItems='center'
        spacing={3}
    >
        <EnableDarkModeSwitch/>
        <SettingsRadioGroup
            formLabel='Temperature unit'
            settingsKeyName={SETTINGS_KEY_NAMES.TEMPERATURE_UNIT}
            defaultValue={localStorage.getItem(SETTINGS_KEY_NAMES.TEMPERATURE_UNIT)}
            units={TemperatureUnit}/>
        <SettingsRadioGroup
            formLabel='Precipitation unit'
            settingsKeyName={SETTINGS_KEY_NAMES.PRECIPITATION_UNIT}
            defaultValue={localStorage.getItem(SETTINGS_KEY_NAMES.PRECIPITATION_UNIT)}
            units={PrecipitationUnit}/>
        <SettingsRadioGroup
            formLabel='Wind speed unit'
            settingsKeyName={SETTINGS_KEY_NAMES.WIND_SPEED_UNIT}
            defaultValue={localStorage.getItem(SETTINGS_KEY_NAMES.WIND_SPEED_UNIT)}
            units={WindSpeedUnit}/>
    </Stack>)
}
