import { botConfig } from 'config'
import type { TextElem } from 'oicq'

import { praseCommandMessage } from '~/utils/message'

import type { GroupCoRoutine } from '../types'

export const multiMessageElemRoutine: GroupCoRoutine = async function (event) {
  const { message } = event
  if (message[0].type === 'at' && message[0].qq == botConfig.uid) {
    return event.reply('没事别@我 👊')
  }
  event.message.forEach((elem) => {
    ;(elem as any).messageElems = event.message
  })
  if (message.length <= 1) {
    return this.next()
  }
  const hasCommand = message.findIndex(
    (elem) => elem.type === 'text' && elem.text.startsWith('/'),
  )
  if (hasCommand !== -1) {
    const textElem = message[hasCommand]
    const result = praseCommandMessage(
      (textElem as any).text,
      textElem as TextElem,
    )
    Object.assign(event, result)
    event.commandMessage = textElem as TextElem
    this.next()
    return
  }
}
