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
  },

  get: {
    tags: ['Pokemon'],
    summary: 'Requests a pokemon list',
    description: 'This route returns all pokemons',
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/pokemon'
              }
            }
          }
        }
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

export const pokemonsIdPath: OpenAPIV3.PathItemObject = {
  put: {
    tags: ['Pokemon'],
    summary: 'Edits an existent pokemon',
    description: 'This route edits an existent pokemon',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Unique identifier of the pokemon',
        required: true,
        schema: {
          type: 'number'
        }
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              treinador: {
                type: 'string'
              }
            }
          }
        }
      }
    },
    responses: {
      204: {
        $ref: '#/components/noContent'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },

  delete: {
    tags: ['Pokemon'],
    summary: 'Removes a pokemon',
    description: 'This route removes an existent pokemon',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Unique identifier of the pokemon',
        required: true,
        schema: {
          type: 'number'
        }
      }
    ],
    responses: {
      204: {
        $ref: '#/components/noContent'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },

  get: {
    tags: ['Pokemon'],
    summary: 'Requests a pokemon information',
    description: 'This route finds a pokemon by id',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Unique identifier of the pokemon',
        required: true,
        schema: {
          type: 'number'
        }
      }
    ],
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

export const pokemonBattlePath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Pokemon'],
    summary: 'Requests a pokemon information',
    description: 'This route finds a pokemon by id',
    parameters: [
      {
        in: 'path',
        name: 'pokemonAId',
        description: 'Unique identifier of the pokemon A',
        required: true,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'path',
        name: 'pokemonBId',
        description: 'Unique identifier of the pokemon B',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                vencedor: {
                  type: 'array',
                  items: {
                    $ref: '#/schemas/pokemon'
                  }
                },
                perdedor: {
                  type: 'array',
                  items: {
                    $ref: '#/schemas/pokemon'
                  }
                }
              }
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
