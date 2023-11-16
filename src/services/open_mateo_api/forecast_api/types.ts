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

export enum DailyWeatherTypes {
    temperature_2m_max,
    temperature_2m_min,
    apparent_temperature_max,
    apparent_temperature_min,
    precipitation_sum,
    rain_sum,
    showers_sum,
    snowfall_sum,
    precipitation_hours,
    precipitation_probability_max,
    precipitation_probability_min,
    precipitation_probability_mean,
    weather_code,
    sunrise,
    sunset,
    wind_speed_10m_max,
    wind_gusts_10m_max,
    wind_direction_10m_dominant,
    shortwave_radiation_sum,
    et0_fao_evapotranspiration,
    uv_index_max,
    uv_index_clear_sky_max,
}

export enum HourlyWeatherParameters {
    temperature_2m,
    relative_humidity_2m,
    dew_point_2m,
    apparent_temperature,
    pressure_msl,
    surface_pressure,
    cloud_cover,
    cloud_cover_low,
    cloud_cover_mid,
    cloud_cover_high,
    wind_speed_10m,
    wind_speed_80m,
    wind_speed_120m,
    wind_speed_180m,
    wind_direction_10m,
    wind_direction_80m,
    wind_direction_120m,
    wind_direction_180m,
    wind_gusts_10m,
    shortwave_radiation,
    direct_radiation,
    direct_normal_irradiance,
    diffuse_radiation,
    vapour_pressure_deficit,
    cape,
    evapotranspiration,
    et0_fao_evapotranspiration,
    precipitation,
    snowfall,
    precipitation_probability,
    rain,
    showers,
    weather_code,
    snow_depth,
    freezing_level_height,
    visibility,
    soil_temperature_0cm,
    soil_temperature_6cm,
    soil_temperature_18cm,
    soil_temperature_54cm,
    soil_moisture_0_to_1cm,
    soil_moisture_1_to_3cm,
    soil_moisture_3_to_9cm,
    soil_moisture_9_to_27cm,
    soil_moisture_27_to_81cm,
    is_day,
}

export enum CurrentWeatherParameters {
    temperature_2m,
    relative_humidity_2m,
    dew_point_2m,
    apparent_temperature,
    shortwave_radiation,
    direct_radiation,
    direct_normal_irradiance,
    diffuse_radiation,
    lightning_potential,
    precipitation,
    snowfall,
    rain,
    showers,
    snowfall_height,
    freezing_level_height,
    cape,
    wind_speed_10m,
    wind_speed_80m,
    wind_direction_10m,
    wind_direction_80m,
    Instant,
    wind_gusts_10m,
    visibility,
    weather_code,
    is_day,
}

/**
 WMO Weather interpretation codes (WW)
 */
export enum WeatherCodes {
    CLEAR_SKY = 0,
    MAINLY_CLEAR = 1,
    PARTLY_CLOUDY = 2,
    OVERCAST = 3,
    FOG = 45,
    DEPOSITING_RIME_FOG = 48,
    LIGHT_DRIZZLE = 51,
    MODERATE_DRIZZLE = 53,
    DENSE_DRIZZLE = 55,
    LIGHT_FREEZING_DRIZZLE = 56,
    DENSE_FREEZING_DRIZZLE = 57,
    SLIGHT_RAIN = 61,
    MODERATE_RAIN = 63,
    HEAVY_RAIN = 65,
    LIGHT_FREEZING_RAIN = 66,
    HEAVY_FREEZING_RAIN = 67,
    SLIGHT_SNOWFALL = 71,
    MODERATE_SNOWFALL = 73,
    HEAVY_SNOWFALL = 75,
    SNOW_GRAINS = 77,
    SLIGHT_RAIN_SHOWERS = 80,
    MODERATE_RAIN_SHOWERS = 81,
    VIOLENT_RAIN_SHOWERS = 82,
    LIGHT_SNOW_SHOWERS = 85,
    HEAVY_SNOW_SHOWERS = 86,
    THUNDERSTORM = 95,
    THUNDERSTORM_WITH_SLIGHT_HAIL = 96,
    THUNDERSTORM_WITH_HEAVY_HAIL = 99,
}
