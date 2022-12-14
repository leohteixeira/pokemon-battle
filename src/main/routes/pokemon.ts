import { adaptRoute } from '@/main/adapters'
import {
  makeAddPokemonController,
  makeBattlePokemonController,
  makeEditPokemonController,
  makeFindPokemonController,
  makeFindPokemonsController,
  makeRemovePokemonController
} from '@/main/factories/controllers'

import { Router } from 'express'

export const applyPokemonRoutes = (router: Router): void => {
  router.post('/pokemons', adaptRoute(makeAddPokemonController()))
  router.put('/pokemons/:id', adaptRoute(makeEditPokemonController()))
  router.delete('/pokemons/:id', adaptRoute(makeRemovePokemonController()))
  router.get('/pokemons/:id', adaptRoute(makeFindPokemonController()))
  router.get('/pokemons', adaptRoute(makeFindPokemonsController()))
  router.post(
    '/pokemons/:pokemonAId/:pokemonBId',
    adaptRoute(makeBattlePokemonController())
  )
}
