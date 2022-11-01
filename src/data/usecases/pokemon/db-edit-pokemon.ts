import { EditPokemonRepository } from '@/data/protocols'
import { EditPokemon } from '@/domain/usecases'

export class DbEditPokemon implements EditPokemon {
  constructor(private readonly editPokemonRepository: EditPokemonRepository) {}

  async edit(params: EditPokemon.Params): Promise<EditPokemon.Result> {
    await this.editPokemonRepository.editPokemon(params)
  }
}
