import { BattlePokemon } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class BattlePokemonController implements Http.Controller {
  constructor(
    private readonly validation: Validation<BattlePokemonController.Request>,
    private readonly battlePokemon: BattlePokemon
  ) {}

  async handle(
    request: BattlePokemonController.Request
  ): Promise<Http.Response<BattlePokemonController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      const result = await this.battlePokemon.battle(request)

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace BattlePokemonController {
  export type Request = BattlePokemon.Params
  export type Response = BattlePokemon.Result
}
