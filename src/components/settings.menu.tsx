import React from 'react';
import {FormControlLabel, Stack, Switch,} from '@mui/material';
import {isDarkModeSettingsEnabled} from "./utils";

const EnableDarkModeSwitch = () => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        localStorage.setItem('darkMode', event.target.checked.toString());
        window.location.reload();
    };

    return (
        <FormControlLabel
            label="Enable dark mode"
            control={
                <Switch onChange={handleChange}
                        color='secondary'
                        defaultChecked={isDarkModeSettingsEnabled()}
                        name='darkMode'/>}
        />)
}


export default function SettingsMenu() {
    return (<Stack
        id='settings-menu'
        direction='column'
        alignItems='center'>
        <EnableDarkModeSwitch/>
    </Stack>)
}
