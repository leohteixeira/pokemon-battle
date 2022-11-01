export const env = {
  port: Number(process.env.PORT) || 3030,

  mssqlHost: process.env.POSTGRES_HOST || 'desafio-jazida.database.windows.net',
  mssqlPort: Number(process.env.POSTGRES_PORT) || 1433,
  mssqlUsername: process.env.POSTGRES_USERNAME || 'DesafioAdmin',
  mssqlPassword: process.env.POSTGRES_PASSWORD || 'Picachu123',
  mssqlSchema: process.env.POSTGRES_SCHEMA || 'schema-leo',
  mssqlDatabase: process.env.POSTGRES_DATABASE || 'Desafio-jz'
}
