import {Coordinates} from "./forecast_api/types";

export const extractCoordinatesFromALocation = (location: any): Coordinates => {
    return [location.latitude, location.longitude];
}
