import React from "react";
import SettingsMenu from "../components/settings.menu";
import Page from '../components/page';
import {Typography} from "@mui/material";

export default function SettingsPage(): React.ReactElement {
    return (
        <Page>
            <Typography variant={'h3'} marginBottom={2}>Settings</Typography>
            <SettingsMenu/>
        </Page>
    )
}
