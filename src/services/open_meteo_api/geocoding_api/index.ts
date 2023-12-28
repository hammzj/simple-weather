import axios, {AxiosResponse} from "axios";
import {isNil} from "lodash";

export interface GetLocationsParams {
    name: string;
    count?: number;
    language?: string;
}

export type LocationId = string | number

export interface LocationData {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
    feature_code?: string;
    elevation?: number;
    population?: number;
    postcodes?: Array<string | number>;
    country_id?: string;
    country_code?: string;
    country?: string;
    admin1?: string;
    admin2?: string;
    admin3?: string;
}

export const OPEN_METEO_GEOCODING_API_URL = "https://geocoding-api.open-meteo.com";

const api = axios.create({baseURL: OPEN_METEO_GEOCODING_API_URL});

export default class OpenMeteoGeocodingAPI {
    static async searchForLocations(params: GetLocationsParams): Promise<AxiosResponse> {
        if (isNil(params.count)) params.count = 25;
        return await api.get(`/v1/search`, {params});
    }

    static async getLocation(id: LocationId): Promise<AxiosResponse> {
        return await api.get(`/v1/get`, {params: {id}});
    }
}
