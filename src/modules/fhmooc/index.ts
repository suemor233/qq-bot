

import { commandRegistry } from '~/registries/command'
import {
  educationLoginRequest,
  educationProcessRequest,
} from '~/service/education'

export const register = () => {
  commandRegistry.register('safe', async (event) => {
    const { commandParsedArgs } = event
    const username = commandParsedArgs._[1] || commandParsedArgs.username
    const password = commandParsedArgs._[2] || commandParsedArgs.password
    if (!username || !password) {
      event.reply('格式错误 ❌', true)
      return
    }

    const user = (await educationLoginRequest({
      username,
      password,
    })) as any
    if (user.data.code <= 0) {
      event.reply(user.data.msg, true)
      return
    }

    if (user.data.code == 5) {
      event.reply('请先去修改密码！！！👊', true)
      return
    }

    const { data } = await educationProcessRequest({
      cookie: user.headers['set-cookie'][1],
    })
    if (data.code == 1) {
      event.reply('刷课成功', true)
    } else {
      event.reply('未知错误', true)
    }
  })
}
