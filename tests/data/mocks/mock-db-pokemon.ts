import { AddPokemonRepository } from '@/data/protocols'
import { mockPokemonModel } from '@/tests/domain/mocks'

export class AddPokemonRepositorySpy implements AddPokemonRepository {
  params: AddPokemonRepository.Params
  result: AddPokemonRepository.Result = mockPokemonModel()

  async add(
    params: AddPokemonRepository.Params
  ): Promise<AddPokemonRepository.Result> {
    this.params = params
    return this.result
  }
}
