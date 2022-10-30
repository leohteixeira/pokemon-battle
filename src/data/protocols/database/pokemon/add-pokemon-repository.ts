import { AddPokemon } from '@/domain/usecases'

export interface AddPokemonRepository {
  add: (
    params: AddPokemonRepository.Params
  ) => Promise<AddPokemonRepository.Result>
}

export namespace AddPokemonRepository {
  export type Params = AddPokemon.Params
  export type Result = AddPokemon.Result
}
