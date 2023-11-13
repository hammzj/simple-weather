export type ApiKey = string;

export type Latitude = number;

export type Longitude = number;

export type Coordinates = [Latitude, Longitude];

export type Timezone = string;

//Per default, only 7 days are returned. Up to 16 days of forecast are possible.
export type ForecastDays = number;

export enum TemperatureUnit {
    celsius,
    fahrenheit,
}

export enum WindSpeedUnit {
    kmh,
    ms,
    mph,
    kn,
}

export enum PrecipitationUnit {
    mm,
    inch,
}
