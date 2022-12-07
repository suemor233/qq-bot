import type { GroupMessageEvent, Sendable } from 'oicq'

type CommandReturnValue =
  | Promise<void>
  | void
  | undefined
  | Promise<undefined>
  | string
  | Promise<string>
  | Sendable
  | Promise<Sendable>
class CommandRegistry<Event> {
  private readonly commandMap = new Map<
    string,
    (event: Event) => CommandReturnValue
  >()


  register(command: string, handler: (event: Event) => CommandReturnValue) {
    if (this.commandMap.has(command)) {
      throw new Error(`Command ${command} already registered`)
    }
    this.commandMap.set(command, handler)

    return () => {
      this.removeCommand(command)
    }
  }


  getHandler(command: string) {
    return this.commandMap.get(command)
  }

  removeCommand(command: string) {
    this.commandMap.delete(command)
  }
}

export const commandRegistry = new CommandRegistry<GroupMessageEvent>()
