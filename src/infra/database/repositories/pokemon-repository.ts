import { DatabaseError } from '@/data/errors'
import {
  AddPokemonRepository,
  BattlePokemonRepository,
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

  async battlePokemon(
    params: BattlePokemonRepository.Params
  ): Promise<BattlePokemonRepository.Result> {
    const pokemonRepository = await MsSQLHelper.getRepository(Pokemon)

    const pokemonA = await pokemonRepository.findOne({
      where: { id: params.pokemonAId }
    })

    if (!pokemonA) {
      throw new DatabaseError.NotFound('Pokemon A could not be found')
    }

    const pokemonB = await pokemonRepository.findOne({
      where: { id: params.pokemonBId }
    })

    if (!pokemonB) {
      throw new DatabaseError.NotFound('Pokemon B could not be found')
    }

    const result = this.fight(pokemonA, pokemonB)

    result.vencedor.nivel += 1
    await pokemonRepository.save(result.vencedor)
    result.perdedor.nivel -= 1

    if (result.perdedor.nivel === 0) {
      await pokemonRepository.delete({ id: result.perdedor.id })
    } else {
      await pokemonRepository.save(result.perdedor)
    }

    return result
  }

  fight(pokemonA: Pokemon, pokemonB: Pokemon): BattlePokemonRepository.Result {
    const pokemonANumber = Math.floor(Math.random() * 9 + 1)
    const pokemonBNumber = Math.floor(Math.random() * 9 + 1)
    const result = {
      vencedor: null,
      perdedor: null
    }

    if (pokemonA.nivel === pokemonB.nivel) {
      if (pokemonANumber > pokemonBNumber) {
        result.vencedor = pokemonA
        result.perdedor = pokemonB
      } else {
        result.vencedor = pokemonB
        result.perdedor = pokemonA
      }
    }

    if (pokemonA.nivel > pokemonB.nivel) {
      if ((pokemonANumber * 2) / 3 > pokemonBNumber / 3) {
        result.vencedor = pokemonA
        result.perdedor = pokemonB
      } else {
        result.vencedor = pokemonB
        result.perdedor = pokemonA
      }
    }

    if (pokemonA.nivel < pokemonB.nivel) {
      if ((pokemonBNumber * 2) / 3 > pokemonANumber / 3) {
        result.vencedor = pokemonB
        result.perdedor = pokemonA
      } else {
        result.vencedor = pokemonA
        result.perdedor = pokemonB
      }
    }

    return result
  }
}
