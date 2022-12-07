import axios from 'axios'
import type { GroupMessageEvent } from 'oicq'
import qs from 'qs'

import {
  educationLoginRequest,
  educationProcessRequest,
} from '~/service/education'

export const handleEducation = async (e: GroupMessageEvent, msg: string) => {
  const loginAccount = msg.split(' ')
  const username = loginAccount[1]
  const password = loginAccount[2]
  if (!username || !password) {
    return e.reply('格式错误❌',true)
  }

  const user = (await educationLoginRequest({
    username: loginAccount[1],
    password: loginAccount[2],
  })) as any
  if (user.data.code <= 0) {
    return e.reply(user.data.msg,true)
  }

  if (user.data.code == 5) {
    return e.reply('请先去修改密码！！！👊',true)
  }

  const {data} = await educationProcessRequest({cookie:user.headers['set-cookie'][1]})
  if (data.code == 1) {
    return e.reply('刷课成功',true)
  }else {
    return e.reply('未知错误',true)
  }
}
