import {
  createConnection,
  Connection,
  EntitySchema,
  EntityTarget,
  Repository
} from 'typeorm'

export const MsSQLHelper = {
  client: null as Connection,
  host: null as string,
  port: null as number,
  username: null as string,
  password: null as string,
  schema: null as string,
  database: null as string,
  entities: null as Array<string | Function | EntitySchema<any>>,
  dropSchema: null as boolean,

  async connect(
    host: string,
    port: number,
    username: string,
    password: string,
    schema: string,
    database: string,
    entities: Array<string | Function | EntitySchema<any>>,
    dropSchema: boolean
  ): Promise<void> {
    this.host = host
    this.port = port
    this.username = username
    this.password = password
    this.schema = schema
    this.database = database
    this.entities = entities
    this.dropSchema = dropSchema
    this.client = await createConnection({
      type: 'mssql',
      host: host,
      port: port,
      username: username,
      password: password,
      schema: schema,
      database: database,
      entities: entities,
      dropSchema: dropSchema,
      synchronize: true,
      logging: false,
      extra: {
        trustServerCertificate: true
      }
    })
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getRepository(target: EntityTarget<any>): Promise<Repository<any>> {
    if (!this.client?.isConnected) {
      await this.connect(
        this.host,
        this.port,
        this.username,
        this.password,
        this.schema,
        this.database,
        this.entities,
        this.dropSchema
      )
    }
    return this.client.getRepository(target)
  }
}
