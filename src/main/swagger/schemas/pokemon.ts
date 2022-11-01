import { OpenAPIV3 } from 'openapi-types'

export const pokemon: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    tipo: {
      type: 'string'
    },
    treinador: {
      type: 'string'
    },
    nivel: {
      type: 'number'
    }
  },
  required: ['id', 'tipo', 'treinador', 'nivel']
}
