import { readdir } from 'fs/promises'
import { resolve } from 'path'

import { createNamespaceLogger } from '~/utils/logger'
import { hook } from '~/utils/plugin'

const logger = createNamespaceLogger('module-loader')
export const registerModules = async () => {
  const modules = await readdir(resolve(__dirname))

  modules.forEach((module) => {
    if (module.startsWith('index.')) {
      return
    }
    logger.log(`register module: ${module}`)
    try {
      const { register } = require(resolve(__dirname, module))
      hook.register(register)
    } catch (err) {
      logger.error(`register module: ${module} failed`)
      consola.error(err)
    }
  })
}


// export const registerModules = async() => {
  
//   client.on('system.online', () => {
//     weatherForecast.start()
//   })
// }

// const weatherForecast = new CronJob('0 0 6 * * *', async () => {
//   const weather = await weatherRequest()
//   const toWeather = weather.data.data[0]
//   const tasks = botConfig.watchGroupIds.map((id) =>
//     client.sendGroupMsg(
//       id,
//       `下午好！今日天气如下:\n城市: 常州\n当前气温: ${toWeather.tem}℃\n今日天气: ${toWeather.wea}\n今日气温: ${toWeather.tem2}℃ - ${toWeather.tem1}℃`,
//     ),
//   )
//   await Promise.all(tasks)
// })
