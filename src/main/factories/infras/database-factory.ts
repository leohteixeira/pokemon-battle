import { PokemonRepository } from '@/infra/database/repositories'

export const makePokemonRepository = (): PokemonRepository => {
  return new PokemonRepository()
}
