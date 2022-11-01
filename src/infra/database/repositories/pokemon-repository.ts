import { DatabaseError } from '@/data/errors'
import { AddPokemonRepository } from '@/data/protocols'
import { Pokemon } from '@/infra/database/entities'
import { MsSQLHelper } from '@/infra/database/helpers'

export class PokemonRepository implements AddPokemonRepository {
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
}
