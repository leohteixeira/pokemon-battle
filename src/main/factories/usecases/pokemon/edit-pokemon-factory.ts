import { DbEditPokemon } from '@/data/usecases'
import { EditPokemon } from '@/domain/usecases'
import { makePokemonRepository } from '@/main/factories/infras'

export const makeEditPokemon = (): EditPokemon => {
  const pokemonRepository = makePokemonRepository()
  return new DbEditPokemon(pokemonRepository)
}
