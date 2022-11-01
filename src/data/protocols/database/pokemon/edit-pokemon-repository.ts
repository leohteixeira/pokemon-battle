import { EditPokemon } from '@/domain/usecases'

export interface EditPokemonRepository {
  editPokemon: (
    params: EditPokemonRepository.Params
  ) => Promise<EditPokemonRepository.Result>
}

export namespace EditPokemonRepository {
  export type Params = EditPokemon.Params
  export type Result = EditPokemon.Result
}
