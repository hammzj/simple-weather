import React from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { getSavedLocationIds } from "./utils";
import { LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION, SAVED_LOCATION_MAX_LENGTH } from "../constants";
import { isEqual, lt } from "lodash";

const isIdMatching = (id1, id2): boolean => isEqual(id1.toString(), id2.toString());
const isLocationAbleToBeAdded = (idToAdd): boolean => {
    const ids = getSavedLocationIds();
    return (
        lt(getSavedLocationIds().length, SAVED_LOCATION_MAX_LENGTH) &&
        !ids.some((id) => isIdMatching(id, idToAdd))
    );
};

const addSavedLocationId = (idToAdd: number | string) => {
    if (isLocationAbleToBeAdded(idToAdd)) {
        localStorage.setItem(
            LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION,
            [...getSavedLocationIds(), idToAdd].join(",")
        );
    }
};

const removeSavedLocationId = (idToRemove: number | string) => {
    const ids = getSavedLocationIds().filter((id) => !isIdMatching(id, idToRemove));
    localStorage.setItem(LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION, ids.join(","));
};

export default function SavedLocationCheckbox({ id }): React.ReactElement {
    const isLocationAlreadySaved = getSavedLocationIds().some((x) => isIdMatching(x, id));
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.checked ? addSavedLocationId(id) : removeSavedLocationId(id);
    };

    return (
        <Box padding={1.5}>
            <FormControlLabel
                label='Set as favorite location'
                id={`saved-location-toggle-${id}`}
                control={
                    <Checkbox
                        onChange={handleChange}
                        color='secondary'
                        disabled={!isLocationAlreadySaved ?? isLocationAbleToBeAdded(id)}
                        defaultChecked={isLocationAlreadySaved}
                        name={LOCAL_STORAGE_KEY_FOR_SAVED_LOCATION}
                    />
                }
            />
        </Box>
    );
}
