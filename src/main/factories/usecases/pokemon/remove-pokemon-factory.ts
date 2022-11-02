import { DbRemovePokemon } from '@/data/usecases'
import { RemovePokemon } from '@/domain/usecases'
import { makePokemonRepository } from '@/main/factories/infras'

export const makeRemovePokemon = (): RemovePokemon => {
  const pokemonRepository = makePokemonRepository()
  return new DbRemovePokemon(pokemonRepository)
}
