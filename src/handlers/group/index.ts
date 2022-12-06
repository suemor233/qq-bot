import type { GroupMessageEvent } from 'oicq'

import { botConfig } from '../../../config'
import { handleChatGPT } from './tasks/handleChatGPT'
import { handleWeather } from './tasks/handleWeather'

export const groupMessageHandler = (e: GroupMessageEvent) => {
  keyworkHandler(e)
}

const keyworkHandler = (e: GroupMessageEvent) => {
  const currentMessage = e.message[0]
  if (currentMessage.type === 'at' && currentMessage.qq === botConfig.uid) {
    return e.reply('没事别@我')
  }
  if (currentMessage.type !== 'text') return
  const keyword = currentMessage.text
  if (keyword.includes('/chat')) return handleChatGPT(e,keyword)
  switch (keyword) {
    case '/ping':
      e.reply('pong')
      break
    case '/weather':
      handleWeather(e)
      break
    case '/help':
      e.reply(
        '当前可用的指令有:\nhelp -> 查看帮助\nweather -> 查看天气\nchat -> chatGPT\nping -> 测试机器人是否在线',
      )
      break
  }
}