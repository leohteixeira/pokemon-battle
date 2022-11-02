import { FindPokemonRepository } from '@/data/protocols'
import { FindPokemon } from '@/domain/usecases'

export class DbFindPokemon implements FindPokemon {
  constructor(private readonly findPokemonRepository: FindPokemonRepository) {}

  async find(params: FindPokemon.Params): Promise<FindPokemon.Result> {
    const pokemon = await this.findPokemonRepository.findPokemon(params)
    return pokemon
  }
}
