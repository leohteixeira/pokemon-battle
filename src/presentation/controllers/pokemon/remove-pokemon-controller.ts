import { RemovePokemon } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { noContent } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class RemovePokemonController implements Http.Controller {
  constructor(
    private readonly validation: Validation<RemovePokemonController.Request>,
    private readonly removePokemon: RemovePokemon
  ) {}

  async handle(
    request: RemovePokemonController.Request
  ): Promise<Http.Response<RemovePokemonController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      await this.removePokemon.remove(request)

      return noContent()
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace RemovePokemonController {
  export type Request = RemovePokemon.Params
  export type Response = RemovePokemon.Result
}
