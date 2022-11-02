import { BattlePokemon } from '@/domain/usecases'

export interface BattlePokemonRepository {
  battlePokemon: (
    params: BattlePokemonRepository.Params
  ) => Promise<BattlePokemonRepository.Result>
}

export namespace BattlePokemonRepository {
  export type Params = BattlePokemon.Params
  export type Result = BattlePokemon.Result
}
