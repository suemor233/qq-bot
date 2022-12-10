import { botConfig } from 'config'
import { CronJob } from 'cron'

import { client } from '~/client'
import { commandRegistry } from '~/registries/command'
import { weatherRequest } from '~/service/weather'

export const register = () => {
  commandRegistry.register('wea', async (event) => {
    const weather = await weatherRequest()
    const toWeather = weather.data.data[0]
    const tmrWeather = weather.data.data[1]
    event.reply(
      `城市: 常州\n当前气温: ${toWeather.tem}℃\n当前天气: ${toWeather.wea}\n今日气温: ${toWeather.tem2}℃ - ${toWeather.tem1}℃\n----------------\n明日天气: ${tmrWeather.wea}\n明日气温: ${tmrWeather.tem2}℃ - ${tmrWeather.tem1}℃`,
    )
  })

  const weatherForecast = new CronJob('0 0 6 * * *', async () => {
    const weather = await weatherRequest()
    const toWeather = weather.data.data[0]
    const tasks = botConfig.watchGroupIds.map((id) =>
      client.sendGroupMsg(
        id,
        `早上好！今日天气如下:\n城市: 常州\n当前气温: ${toWeather.tem}℃\n今日天气: ${toWeather.wea}\n今日气温: ${toWeather.tem2}℃ - ${toWeather.tem1}℃`,
      ),
    )
    await Promise.all(tasks)
  })

  weatherForecast.start()
}
