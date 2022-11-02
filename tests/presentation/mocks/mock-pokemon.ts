import { AddPokemon, EditPokemon, RemovePokemon } from '@/domain/usecases'
import { mockPokemonModel } from '@/tests/domain/mocks'

export class AddPokemonSpy implements AddPokemon {
  params: AddPokemon.Params
  result: AddPokemon.Result = mockPokemonModel()

  async add(params: AddPokemon.Params): Promise<AddPokemon.Result> {
    this.params = params
    return this.result
  }
}

export class EditPokemonSpy implements EditPokemon {
  params: EditPokemon.Params

  async edit(params: EditPokemon.Params): Promise<EditPokemon.Result> {
    this.params = params
  }
}

export class RemovePokemonSpy implements RemovePokemon {
  params: RemovePokemon.Params

  async remove(params: RemovePokemon.Params): Promise<RemovePokemon.Result> {
    this.params = params
  }
}
