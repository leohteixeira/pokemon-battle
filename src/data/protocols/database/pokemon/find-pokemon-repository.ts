import { FindPokemon } from '@/domain/usecases'

export interface FindPokemonRepository {
  findPokemon: (
    params: FindPokemonRepository.Params
  ) => Promise<FindPokemonRepository.Result>
}

export namespace FindPokemonRepository {
  export type Params = FindPokemon.Params
  export type Result = FindPokemon.Result
}
