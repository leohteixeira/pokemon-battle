import { adaptRoute } from '@/main/adapters'
import { makeAddPokemonController } from '@/main/factories/controllers'

import { Router } from 'express'

export const applyPokemonRoutes = (router: Router): void => {
  router.post('/pokemons', adaptRoute(makeAddPokemonController()))
}
