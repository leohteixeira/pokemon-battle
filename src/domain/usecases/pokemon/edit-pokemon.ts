export interface EditPokemon {
  edit: (params: EditPokemon.Params) => Promise<EditPokemon.Result>
}

export namespace EditPokemon {
  export type Params = {
    id: number
    treinador: string
  }
  export type Result = void
}
