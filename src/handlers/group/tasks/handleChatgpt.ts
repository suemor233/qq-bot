import { botConfig } from 'config'
import type { GroupMessageEvent } from 'oicq'

import { spliteMessage } from '~/utils/message'

export const handleChatGPT = async (e: GroupMessageEvent, msg: string) => {
  const { ChatGPTAPI } = await import('chatgpt')
  const _msg = spliteMessage(msg)
  if (!_msg) return e.reply('请输入要聊天的内容')
  const api = new ChatGPTAPI({
    sessionToken: botConfig.chatgpt.token,
    markdown: false,
  })

  try {
    const response = await api.sendMessage(_msg)
    console.log(response)
    e.reply(response, true)
  } catch (error) {
    console.log(error)
  }
}
