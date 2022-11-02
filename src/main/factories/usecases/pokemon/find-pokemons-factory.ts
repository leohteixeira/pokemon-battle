import { DbFindPokemons } from '@/data/usecases'
import { FindPokemons } from '@/domain/usecases'
import { makePokemonRepository } from '@/main/factories/infras'

export const makeFindPokemons = (): FindPokemons => {
  const pokemonRepository = makePokemonRepository()
  return new DbFindPokemons(pokemonRepository)
}
