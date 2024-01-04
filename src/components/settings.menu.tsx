import React from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Switch,} from '@mui/material';
import {isDarkModeSettingsEnabled} from "./utils";
import {SETTINGS_KEY_NAMES} from "../constants";
import {TemperatureUnit, WindSpeedUnit, PrecipitationUnit} from '../services/open_meteo_api/forecast_api';

const EnableDarkModeSwitch = (): React.ReactElement => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem(SETTINGS_KEY_NAMES.DARK_MODE, event.target.checked.toString());
        window.location.reload();
    };

    return (
        <FormControlLabel
            label="Enable dark mode"
            control={
                <Switch onChange={handleChange}
                        color='secondary'
                        defaultChecked={isDarkModeSettingsEnabled()}
                        name={SETTINGS_KEY_NAMES.DARK_MODE}/>}
        />)
}

const SettingsRadioGroup = ({
                                settingsKeyName,
                                defaultValue,
                                formLabel,
                                units,
                                handleChange
                            }): React.ReactElement => {
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
                {Object
                    .keys(units).map((unit, i) => {
                        return <FormControlLabel key={unit} value={unit} control={<Radio color='secondary'/>}
                                                 label={unit}/>
                    })
                }

            </RadioGroup>
        </FormControl>
    )
}


export default function SettingsMenu(): React.ReactElement {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.debug('updated local storage:', event.target.name, event.target.value)
        localStorage.setItem(event.target.name, event.target.value);
    };

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
            defaultValue={localStorage.getItem(SETTINGS_KEY_NAMES.TEMPERATURE_UNIT) ?? TemperatureUnit.fahrenheit}
            units={TemperatureUnit} handleChange={handleChange}/>
        <SettingsRadioGroup
            formLabel='Precipitation unit'
            settingsKeyName={SETTINGS_KEY_NAMES.PRECIPITATION_UNIT}
            defaultValue={localStorage.getItem(SETTINGS_KEY_NAMES.PRECIPITATION_UNIT) ?? PrecipitationUnit.inch}
            units={PrecipitationUnit} handleChange={handleChange}/>
        <SettingsRadioGroup
            formLabel='Wind speed unit'
            settingsKeyName={SETTINGS_KEY_NAMES.WIND_SPEED_UNIT}
            defaultValue={localStorage.getItem(SETTINGS_KEY_NAMES.WIND_SPEED_UNIT) ?? WindSpeedUnit.mph}
            units={WindSpeedUnit} handleChange={handleChange}/>
    </Stack>)
}
