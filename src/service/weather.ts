import axios from 'axios'

import type { WeatherType } from '~/types/weather'

export const weatherRequest = () => {
  return axios.get<WeatherType>(
    'https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=常州',
  )
}


