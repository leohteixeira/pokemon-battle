import { adaptRoute } from '@/main/adapters'
import {
  makeAddPokemonController,
  makeEditPokemonController,
  makeFindPokemonController,
  makeRemovePokemonController
} from '@/main/factories/controllers'

import { Router } from 'express'

export const applyPokemonRoutes = (router: Router): void => {
  router.post('/pokemons', adaptRoute(makeAddPokemonController()))
  router.put('/pokemons/:id', adaptRoute(makeEditPokemonController()))
  router.delete('/pokemons/:id', adaptRoute(makeRemovePokemonController()))
  router.get('/pokemons/:id', adaptRoute(makeFindPokemonController()))
}
