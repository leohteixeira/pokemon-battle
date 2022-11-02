import { DatabaseError } from '@/data/errors'
import {
  AddPokemonRepository,
  EditPokemonRepository,
  FindPokemonRepository,
  FindPokemonsRepository,
  RemovePokemonRepository
} from '@/data/protocols'
import { Pokemon } from '@/infra/database/entities'
import { MsSQLHelper } from '@/infra/database/helpers'

export class PokemonRepository
  implements
    AddPokemonRepository,
    EditPokemonRepository,
    RemovePokemonRepository,
    FindPokemonRepository,
    FindPokemonsRepository
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

  async removePokemon(
    params: RemovePokemonRepository.Params
  ): Promise<RemovePokemonRepository.Result> {
    try {
      const pokemonRepository = await MsSQLHelper.getRepository(Pokemon)
      const pokemon = await pokemonRepository.findOne({
        where: { id: params.id }
      })

      if (!pokemon) {
        throw new DatabaseError.NotFound('Pokemon could not be found')
      }

      await pokemonRepository.delete({ id: params.id })
    } catch (error) {
      if (error instanceof DatabaseError.NotFound) throw error
      throw new DatabaseError.RemoveFail(String(error.stack))
    }
  }

  async findPokemon(
    params: FindPokemonRepository.Params
  ): Promise<FindPokemonRepository.Result> {
    const pokemonRepository = await MsSQLHelper.getRepository(Pokemon)

    const pokemon = await pokemonRepository.findOne({
      where: { id: params.id }
    })

    if (!pokemon) {
      throw new DatabaseError.NotFound('Pokemon could not be found')
    }
    return pokemon
  }

  async findPokemons(): Promise<FindPokemonsRepository.Result> {
    const pokemonRepository = await MsSQLHelper.getRepository(Pokemon)

    const result = await pokemonRepository.find({})

    return result
  }
}
