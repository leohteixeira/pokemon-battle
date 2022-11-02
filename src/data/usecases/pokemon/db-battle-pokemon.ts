import { BattlePokemonRepository } from '@/data/protocols'
import { BattlePokemon } from '@/domain/usecases'

export class DbBattlePokemon {
  constructor(
    private readonly battlePokemonRepository: BattlePokemonRepository
  ) {}

  async battle(params: BattlePokemon.Params): Promise<BattlePokemon.Result> {
    const result = await this.battlePokemonRepository.battlePokemon(params)
    return result
  }
}
