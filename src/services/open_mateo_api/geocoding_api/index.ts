import axios, {AxiosResponse} from "axios";
import {GetLocationsParams} from "./types";

const OPEN_METEO_GEOCODING_API_URL = "https://geocoding-api.open-meteo.com";
const api = axios.create({baseURL: OPEN_METEO_GEOCODING_API_URL});

export class OpenMeteoGeocodingAPI {
    static async searchForLocations(params: GetLocationsParams): Promise<AxiosResponse[]> {
        return await api.get(`/v1/search`, {params});
    }
}

export default OpenMeteoGeocodingAPI;
