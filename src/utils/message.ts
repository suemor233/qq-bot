export const spliteMessage = (msg: string) => {
  const _str = msg.indexOf(' ')
  if (_str === -1) return undefined
  const _msg = msg.substring(_str + 1, msg.length)
  return _msg === '' ? undefined : _msg
}
