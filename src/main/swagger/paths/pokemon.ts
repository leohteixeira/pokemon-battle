import { OpenAPIV3 } from 'openapi-types'

export const pokemonsPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Pokemon'],
    summary: 'Adds a new pokemon',
    description: 'This route adds a new pokemon',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              tipo: {
                type: 'string',
                enum: ['charizard', 'pikachu', 'mewtwo']
              },
              treinador: {
                type: 'string'
              }
            },
            required: ['tipo', 'treinador']
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/pokemon'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
