import { DatabaseError } from '@/data/errors'
import { AddPokemonRepository, EditPokemonRepository } from '@/data/protocols'
import { Pokemon } from '@/infra/database/entities'
import { MsSQLHelper } from '@/infra/database/helpers'

export class PokemonRepository
  implements AddPokemonRepository, EditPokemonRepository
{
  async add(
    params: AddPokemonRepository.Params
  ): Promise<AddPokemonRepository.Result> {
    try {
      const pokemonRepository = await MsSQLHelper.getRepository(Pokemon)
      return await pokemonRepository.save({ ...params })
    } catch (error) {
      throw new DatabaseError.InsertFail(String(error.stack))
    }
  }

  async editPokemon(
    params: EditPokemonRepository.Params
  ): Promise<EditPokemonRepository.Result> {
    try {
      const pokemonRepository = await MsSQLHelper.getRepository(Pokemon)
      const pokemon = await pokemonRepository.findOne({
        where: { id: params.id }
      })

      if (!pokemon) {
        throw new DatabaseError.NotFound('Pokemon could not be found')
      }

      pokemon.treinador = params.treinador

      await pokemonRepository.save(pokemon)
    } catch (error) {
      if (error instanceof DatabaseError.NotFound) throw error
      throw new DatabaseError.UpdateFail()
    }
  }
}
