import cgpt from 'chatgpt-lib'
import { botConfig } from 'config'

import { commandRegistry } from '~/registries/command'

export const register = async () => {
  const chatbot = new cgpt.ChatGPT({
    SessionToken: botConfig.chatgpt.token,
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
      const response = await chatbot.ask(msg)
      event.reply(response, true)
    } catch (error) {
      console.log(error)
    }
  })


}
