export interface WeatherType {
  cityid: string;
  city: string;
  cityEn: string;
  country: string;
  countryEn: string;
  update_time: string;
  data: weatherDetail[];
  nums: number;
}

interface weatherDetail {
  day: string;
  date: string;
  week: string;
  wea: string;
  wea_img: string;
  wea_day: string;
  wea_day_img: string;
  wea_night: string;
  wea_night_img: string;
  tem: string;
  tem1: string;
  tem2: string;
  humidity: string;
  visibility: string;
  pressure: string;
  win: string[];
  win_speed: string;
  win_meter: string;
  sunrise: string;
  sunset: string;
  air: string;
  air_level: string;
  air_tips: string;
  phrase: string;
  narrative: string;
  moonrise: string;
  moonset: string;
  moonPhrase: string;
  rain: string;
  uvIndex: string;
  uvDescription: string;
  alarm?: any[];
}