export namespace Pokemon {
  export interface Model {
    id: number
    tipo: PokemonType
    treinador: string
    nivel: number
  }

  export enum PokemonType {
    CHARIZARD = 'charizard',
    MEWTWO = 'mewtwo',
    PIKACHU = 'pikachu'
  }
}
