import {
  AddPokemonRepository,
  EditPokemonRepository,
  FindPokemonRepository,
  FindPokemonsRepository,
  RemovePokemonRepository
} from '@/data/protocols'
import { mockPokemonModel, mockPokemonModels } from '@/tests/domain/mocks'

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

export class EditPokemonRepositorySpy implements EditPokemonRepository {
  params: EditPokemonRepository.Params

  async editPokemon(
    params: EditPokemonRepository.Params
  ): Promise<EditPokemonRepository.Result> {
    this.params = params
  }
}

export class RemovePokemonRepositorySpy implements RemovePokemonRepository {
  params: RemovePokemonRepository.Params

  async removePokemon(
    params: RemovePokemonRepository.Params
  ): Promise<RemovePokemonRepository.Result> {
    this.params = params
  }
}

export class FindPokemonRepositorySpy implements FindPokemonRepository {
  params: FindPokemonRepository.Params
  result: FindPokemonRepository.Result = mockPokemonModel()

  async findPokemon(
    params: FindPokemonRepository.Params
  ): Promise<FindPokemonRepository.Result> {
    this.params = params
    return this.result
  }
}

export class FindPokemonsRepositorySpy implements FindPokemonsRepository {
  result: FindPokemonsRepository.Result = mockPokemonModels()

  async findPokemons(): Promise<FindPokemonsRepository.Result> {
    return this.result
  }
}
