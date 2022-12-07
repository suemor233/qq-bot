import { botConfig } from 'config'
import { CronJob } from 'cron'

import { client } from '~/client'
import { weatherRequest } from '~/service/weather'

export const registerModules = () => {
  client.on('system.online', () => {
    weatherForecast.start()
  })
}

const weatherForecast = new CronJob('0 0 13 * * *', async () => {
  const weather = await weatherRequest()
  const toWeather = weather.data.data[0]
  const tasks = botConfig.watchGroupIds.map((id) =>
    client.sendGroupMsg(
      id,
      `下午好！今日天气如下:\n城市: 常州\n当前气温: ${toWeather.tem}℃\n今日天气: ${toWeather.wea}\n今日气温: ${toWeather.tem2}℃ - ${toWeather.tem1}℃`,
    ),
  )
  await Promise.all(tasks)
})
