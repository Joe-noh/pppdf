import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const db = new URL(Env.get('DB_URL'))

const databaseConfig: DatabaseConfig = {
  connection: 'mysql',
  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: db.hostname,
        port: parseInt(db.port),
        user: db.username,
        password: db.password,
        database: db.pathname.replace('/', ''),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig
