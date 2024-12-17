export interface Coordinates {
  lat: number;
  lon: number;
}
export interface WeatherCondition {
  id: number;
  icon: string;
  description: string;
}

export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  dt: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: WeatherData["main"];
    weather: WeatherData["weather"];
    wind: WeatherData["wind"];
    dt_txt: string;
  }>;

  city: {
    name: string;
    country: string;
    sunrise: number;
    suset: number;
  };
}

export interface GeocodingResponse {
  lat: number;
  lon: number;
  name: string;
  country: string;
  local_names?: Record<string, string>;
  state?: string;
}
