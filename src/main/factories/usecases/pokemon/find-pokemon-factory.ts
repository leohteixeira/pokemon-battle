import { DbFindPokemon } from '@/data/usecases'
import { FindPokemon } from '@/domain/usecases'
import { makePokemonRepository } from '@/main/factories/infras'

export const makeFindPokemon = (): FindPokemon => {
  const pokemonRepository = makePokemonRepository()
  return new DbFindPokemon(pokemonRepository)
}
