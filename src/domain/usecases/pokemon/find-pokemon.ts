import { Pokemon } from '@/domain/models'

export interface FindPokemon {
  find: (params: FindPokemon.Params) => Promise<FindPokemon.Result>
}

export namespace FindPokemon {
  export type Params = {
    id: number
  }
  export type Result = Pokemon.Model
}
