export const env = {
  port: Number(process.env.PORT) || 3030,

  mssqlHost: process.env.MSSQL_HOST || 'desafio-jazida.database.windows.net',
  mssqlPort: Number(process.env.MSSQL_PORT) || 1433,
  mssqlUsername: process.env.MSSQL_USERNAME || 'DesafioAdmin',
  mssqlPassword: process.env.MSSQL_PASSWORD || 'Picachu123',
  mssqlSchema: process.env.MSSQL_SCHEMA || 'schema-leo',
  mssqlDatabase: process.env.MSSQL_DATABASE || 'Desafio-jz'
}
