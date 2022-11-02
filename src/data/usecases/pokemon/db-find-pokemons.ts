import { FindPokemonsRepository } from '@/data/protocols'
import { FindPokemons } from '@/domain/usecases'

export class DbFindPokemons implements FindPokemons {
  constructor(
    private readonly findPokemonsRepository: FindPokemonsRepository
  ) {}

  async find(): Promise<FindPokemons.Result> {
    const result = await this.findPokemonsRepository.findPokemons()
    return result
  }
}
