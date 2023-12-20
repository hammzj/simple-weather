import axios, {AxiosResponse} from "axios";
import {GetLocationsParams} from "./types";
import {isNil} from "lodash";

export const OPEN_METEO_GEOCODING_API_URL = "https://geocoding-api.open-meteo.com";

const api = axios.create({baseURL: OPEN_METEO_GEOCODING_API_URL});

export default class OpenMeteoGeocodingAPI {
    static async searchForLocations(params: GetLocationsParams): Promise<AxiosResponse> {
        if (isNil(params.count)) params.count = 25;
        return await api.get(`/v1/search`, {params});
    }
}
