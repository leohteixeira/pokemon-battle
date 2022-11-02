import { makeBattlePokemon } from '@/main/factories/usecases'
import { makeBattlePokemonValidation } from '@/main/factories/validations'
import { BattlePokemonController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeBattlePokemonController = (): Http.Controller => {
  const validation = makeBattlePokemonValidation()
  const battlePokemon = makeBattlePokemon()
  return new BattlePokemonController(validation, battlePokemon)
}
