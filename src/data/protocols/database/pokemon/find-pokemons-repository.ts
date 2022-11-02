import { FindPokemons } from '@/domain/usecases'

export interface FindPokemonsRepository {
  findPokemons: () => Promise<FindPokemonsRepository.Result>
}

export namespace FindPokemonsRepository {
  export type Result = FindPokemons.Result
}
