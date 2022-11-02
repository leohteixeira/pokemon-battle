import { Pokemon } from '@/domain/models'

export interface FindPokemons {
  find: () => Promise<FindPokemons.Result>
}

export namespace FindPokemons {
  export type Result = Pokemon.Model[]
}
