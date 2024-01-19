import React from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { getSavedLocationId } from "./utils";
import { LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION } from "../constants";
import { isEmpty, isEqual } from "lodash";

const addSavedLocationId = (id: number | string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION, id.toString());
};

const removeSavedLocationId = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION);
};

export default function SavedLocationCheckbox({ locationId }): React.ReactElement {
    const isLocationAlreadySaved = isEqual(getSavedLocationId(), locationId.toString());
    const isThereASavedLocation = !isEmpty(getSavedLocationId());
    const setAsDisabled = isThereASavedLocation && !isLocationAlreadySaved;
    const label = setAsDisabled ? "A saved location already exists" : "Set as saved location";
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.checked ? addSavedLocationId(locationId) : removeSavedLocationId();
    };

    return (
        <Box padding='1.5em'>
            <FormControlLabel
                label={label}
                id={`saved-location-toggle-${locationId}`}
                control={
                    <Checkbox
                        onChange={handleChange}
                        color='secondary'
                        disabled={setAsDisabled}
                        defaultChecked={isLocationAlreadySaved}
                        name={LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION}
                    />
                }
            />
        </Box>
    );
}
