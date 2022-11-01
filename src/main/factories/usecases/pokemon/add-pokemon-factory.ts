import { DbAddPokemon } from '@/data/usecases'
import { AddPokemon } from '@/domain/usecases'
import { makePokemonRepository } from '@/main/factories/infras'

export const makeAddPokemon = (): AddPokemon => {
  const pokemonRepository = makePokemonRepository()
  return new DbAddPokemon(pokemonRepository)
}
