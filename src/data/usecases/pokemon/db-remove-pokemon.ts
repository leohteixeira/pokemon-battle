import { RemovePokemonRepository } from '@/data/protocols'
import { RemovePokemon } from '@/domain/usecases'

export class DbRemovePokemon implements RemovePokemon {
  constructor(
    private readonly removePokemonRepository: RemovePokemonRepository
  ) {}

  async remove(params: RemovePokemon.Params): Promise<RemovePokemon.Result> {
    await this.removePokemonRepository.removePokemon(params)
  }
}
