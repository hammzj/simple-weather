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
