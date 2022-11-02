# pokemon-battle

CRUD feito com **Node.Js** usando **Typescript**. Foi utilizado o **Express** para construção do servidor, **SQL Server** como banco de dados, **TypeORM** para facilitar a manipulação dos documentos, **Jest** para realizar os testes unitários, **Swagger** para documentar o funcionamento da API.

O projeto foi arquitetado baseado nos princípios do **Clean Architecture** utilizando o **domain layer** contendo as regras de negócio nos protocolos, o **data layer** contendo a implementação dos protocolos, o **infra layer** contendo os frameworks e drivers para comunicação externa, o **presentation layer** com os controladores das rotas, e no **main layer** contendo a composição das rotas e do servidor.

## Para rodar o servidor:

### Instale as dependências

```bash
$ npm install
```

### Inicie o servidor

```bash
$ npm start
```

### O servidor inciará na porta:3030

- Acesse <http://localhost:3030>

### O swagger inciará na porta:3030

- Acesse <http://localhost:3030/api-docs/#/>

### Para rodar os testes

```bash
$ npm test
```

### Para gerar o coverage

```bash
$ npm run test:ci
```

- Para acessar: coverage/Icov-report/index.html
