import {
  AddPokemon,
  BattlePokemon,
  EditPokemon,
  FindPokemon,
  FindPokemons,
  RemovePokemon
} from '@/domain/usecases'
import {
  mockPokemonBattleModel,
  mockPokemonModel,
  mockPokemonModels
} from '@/tests/domain/mocks'

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

export class FindPokemonSpy implements FindPokemon {
  params: FindPokemon.Params
  result: FindPokemon.Result = mockPokemonModel()

  async find(params: FindPokemon.Params): Promise<FindPokemon.Result> {
    this.params = params
    return this.result
  }
}

export class FindPokemonsSpy implements FindPokemons {
  result: FindPokemons.Result = mockPokemonModels()

  async find(): Promise<FindPokemons.Result> {
    return this.result
  }
}

export class BattlePokemonSpy implements BattlePokemon {
  params: BattlePokemon.Params
  result: BattlePokemon.Result = mockPokemonBattleModel()

  async battle(params: BattlePokemon.Params): Promise<BattlePokemon.Result> {
    this.params = params
    return this.result
  }
}
