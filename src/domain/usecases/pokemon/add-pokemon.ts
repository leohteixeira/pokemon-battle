import { Pokemon } from '@/domain/models'

export interface AddPokemon {
  add: (params: AddPokemon.Params) => Promise<AddPokemon.Result>
}

export namespace AddPokemon {
  export type Params = {
    tipo: Pokemon.PokemonType
    treinador: string
  }
  export type Result = Pokemon.Model
}
