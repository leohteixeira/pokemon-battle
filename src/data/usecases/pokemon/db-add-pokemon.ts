import { AddPokemonRepository } from '@/data/protocols'
import { AddPokemon } from '@/domain/usecases'

export class DbAddPokemon implements AddPokemon {
  constructor(private readonly addPokemonRepository: AddPokemonRepository) {}

  async add(params: AddPokemon.Params): Promise<AddPokemon.Result> {
    const pokemon = await this.addPokemonRepository.add(params)
    return pokemon
  }
}
