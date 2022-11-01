import { RemovePokemon } from '@/domain/usecases'

export interface RemovePokemonRepository {
  removePokemon: (
    params: RemovePokemonRepository.Params
  ) => Promise<RemovePokemonRepository.Result>
}

export namespace RemovePokemonRepository {
  export type Params = RemovePokemon.Params
  export type Result = RemovePokemon.Result
}
