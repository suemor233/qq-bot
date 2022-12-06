import { Platform, createClient } from 'oicq'

import { botConfig } from '../config'
import { groupMessageHandler } from './handlers/group'

const account = botConfig.uid

const client = createClient(account, {
  platform: botConfig.platform ?? Platform.Android,
  log_level: 'warn',
})



client.on('message.group', async (e) => {
  const { group_id } = e

  if (botConfig.groupIds.includes(group_id)) {
    return  groupMessageHandler(e)
  }
})

client.on('system.login.device', () => {
  client.logger.mark('输入密保手机收到的短信验证码后按下回车键继续。')
  client.sendSmsCode()
  process.stdin.once('data', (input) => {
    client.submitSmsCode(input.toString())
  })
})

client
  .on('system.login.slider', function (e) {
    console.log('输入ticket：')
    process.stdin.once('data', (ticket) =>
      this.submitSlider(String(ticket).trim()),
    )
  })
  .login(botConfig.password)

export { client }
function formatNow() {
  return Intl.DateTimeFormat(undefined, {
    timeStyle: 'long',
    dateStyle: 'medium',
  }).format(new Date())
}
