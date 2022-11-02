import { Pokemon } from '@/domain/models'

export interface BattlePokemon {
  battle: (params: BattlePokemon.Params) => Promise<BattlePokemon.Result>
}

export namespace BattlePokemon {
  export type Params = {
    pokemonAId: number
    pokemonBId: number
  }
  export type Result = {
    vencedor: Pokemon.Model
    perdedor: Pokemon.Model
  }
}
