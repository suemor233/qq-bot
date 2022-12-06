import { registerModules } from './modules'
import { registerLogger } from './utils/logger'


  async function bootstrap() {
    registerLogger()
    const { client } = await import('./client')
    await client.login()
    registerModules()
  }

  bootstrap()