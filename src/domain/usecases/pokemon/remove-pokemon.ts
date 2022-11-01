export interface RemovePokemon {
  remove: (params: RemovePokemon.Params) => Promise<RemovePokemon.Result>
}

export namespace RemovePokemon {
  export type Params = {
    id: string
  }
  export type Result = void
}
