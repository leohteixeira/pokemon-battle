import { AddPokemon } from '@/domain/usecases'
import { mockPokemonModel } from '@/tests/domain/mocks'

export class AddPokemonSpy implements AddPokemon {
  params: AddPokemon.Params
  result: AddPokemon.Result = mockPokemonModel()

  async add(params: AddPokemon.Params): Promise<AddPokemon.Result> {
    this.params = params
    return this.result
  }
}
