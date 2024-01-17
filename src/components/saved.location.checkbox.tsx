import React from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { getSavedLocationId } from "./utils";
import { LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION } from "../constants";
import { isEqual } from "lodash";

const addSavedLocationId = (id: number | string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION, id.toString());
};

const removeSavedLocationId = (id: number | string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION, id);
};

export default function SavedLocationCheckbox({ id }): React.ReactElement {
    const isLocationAlreadySaved = isEqual(getSavedLocationId(), id.toString());
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.checked ? addSavedLocationId(id) : removeSavedLocationId(id);
    };

    return (
        <Box padding='1.5em'>
            <FormControlLabel
                label='Set as save location'
                id={`saved-location-toggle-${id}`}
                control={
                    <Checkbox
                        onChange={handleChange}
                        color='secondary'
                        defaultChecked={isLocationAlreadySaved}
                        name={LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION}
                    />
                }
            />
        </Box>
    );
}
