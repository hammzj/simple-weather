import React from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { getSavedLocationIds } from "./utils";
import { LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION } from "../constants";

const addSavedLocationId = (id) => {
    if (!getSavedLocationIds().some((k) => k == id.toString())) {
        const ids = getSavedLocationIds();
        ids.push(id);
        localStorage.setItem(LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION, ids.join(","));
    }
};

const removeSavedLocationId = (id) => {
    const ids = getSavedLocationIds().filter((i) => i != id.toString());
    localStorage.setItem(LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION, ids.join(","));
    console.log("removed", getSavedLocationIds());
};

export default function SavedLocationCheckbox({ id }): React.ReactElement {
    const isAlreadySaved = getSavedLocationIds().some((k) => k == id);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.checked ? addSavedLocationId(id) : removeSavedLocationId(id);
    };

    return (
        <Box padding='0.5em'>
            <FormControlLabel
                label='Set as favorite location'
                id={`saved-location-toggle-${id}`}
                control={
                    <Checkbox
                        onChange={handleChange}
                        color='secondary'
                        defaultChecked={isAlreadySaved}
                        name={LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION}
                    />
                }
            />
        </Box>
    );
}
