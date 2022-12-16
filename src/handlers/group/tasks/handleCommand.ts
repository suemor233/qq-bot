import { commandRegistry } from '~/registries/command'
import { createNamespaceLogger } from '~/utils/logger'

import type { GroupCoRoutine } from '../types'

const logger = createNamespaceLogger('commander')
export const commandMessageRoutine: GroupCoRoutine = async function (event) {
  if (!event.commandMessage || !event.commandName) {
    this.next()
    return
  }


  const { commandName, commandParsedArgs: args, shouldQuote = false } = event

  logger.debug('commandName: ', commandName)

  switch (commandName) {
    case 'ping':
      event.reply('pong', shouldQuote)
      break
    case 'uptime': {
      const T = performance.now()
      const M = 24 * 60 * 60 * 1000
      const a = T / M
      const A = Math.floor(a)
      const b = (a - A) * 24
      const B = Math.floor(b)
      const c = (b - B) * 60
      const C = Math.floor((b - B) * 60)
      const D = Math.floor((c - C) * 60)
      const message = `已运行: ${A}天${B}小时${C}分${D}秒`
      event.reply(message, shouldQuote)
      break
    }
    case 'help':
      event.reply(
        '当前可用的指令有:\nhelp -> 查看帮助\nwea -> 查看天气\nchat -> chatGPT\nsafe -> 代刷安全平台时长和测试 -> 格式: /safe 用户名 密码\nping -> 测试机器人是否在线\nuptime -> 运行时间',
      )
      break
  }

  // handle command registry

  const handler = commandRegistry.getHandler(commandName)

  if (handler) {
    const result = await handler(event)
    const isSendable = checkIsSendable(result)

    if (isSendable) {
      event.reply(result as any, shouldQuote)
    }

    this.abort()
  }

  // 没有匹配到命令也终止
  this.abort()
}

function checkIsSendable(obj: any) {
  if (!obj) {
    return false
  }
  return typeof obj === 'string' || (typeof obj === 'object' && 'type' in obj)
}
