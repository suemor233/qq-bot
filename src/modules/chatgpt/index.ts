import { ChatGPTAPI } from 'chatgpt'
import { botConfig } from 'config'

import { commandRegistry } from '~/registries/command'

export const register = async () => {
  const api = new ChatGPTAPI({
    sessionToken: botConfig.chatgpt.token,
    markdown: false,
  })

  commandRegistry.register('chat', async (event) => {
    const msg = event.commandParsedArgs._.reduce((acc, cur, index) => {
      if (cur != '/chat') {
        acc += `${cur}${
          index == event.commandParsedArgs._.length - 1 ? '' : ' '
        }`
      }
      return acc
    }, '')

    if (!msg) {
      event.reply('请输入要聊天的内容')
      return
    }
    try {
      const response = await api.sendMessage(msg,{
        timeoutMs: 2 * 60 * 1000
      })
      event.reply(response, true)
    } catch (error) {
      console.log(error)
    }
  })
}
