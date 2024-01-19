import { isNil } from "lodash";
import { LocationData } from "./geocoding_api";

export const getLocationName = (locationData: LocationData): string => {
    return [locationData.name, locationData.admin1, locationData.country]
        .filter((n) => !isNil(n))
        .join(", ");
};
