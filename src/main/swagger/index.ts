import components from './components'
import paths from './paths'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Jazida backend test',
    description:
      'This documentation is related to references to access and consume the API of the Jazida backend test.',
    contact: {
      name: 'Leonardo Teixeira',
      email: 'leohts.tec@hotmail.com'
    }
  },
  servers: [
    {
      url: '/'
    }
  ],
  tags: [
    {
      name: 'Pokemon',
      description: 'APIs related to pokemons'
    }
  ],
  paths,
  schemas,
  components
}
