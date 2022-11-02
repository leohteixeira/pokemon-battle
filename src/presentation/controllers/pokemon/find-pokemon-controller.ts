import { FindPokemon } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class FindPokemonController implements Http.Controller {
  constructor(
    private readonly validation: Validation<FindPokemonController.Request>,
    private readonly findPokemon: FindPokemon
  ) {}

  async handle(
    request: FindPokemonController.Request
  ): Promise<Http.Response<FindPokemonController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      const result = await this.findPokemon.find(request)

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace FindPokemonController {
  export type Request = FindPokemon.Params
  export type Response = FindPokemon.Result
}
