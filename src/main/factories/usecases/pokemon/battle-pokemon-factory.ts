import { DbBattlePokemon } from '@/data/usecases'
import { BattlePokemon } from '@/domain/usecases'
import { makePokemonRepository } from '@/main/factories/infras'

export const makeBattlePokemon = (): BattlePokemon => {
  const pokemonRepository = makePokemonRepository()
  return new DbBattlePokemon(pokemonRepository)
}
