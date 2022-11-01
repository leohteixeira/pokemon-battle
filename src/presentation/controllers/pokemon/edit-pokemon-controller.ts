import { EditPokemon } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { noContent } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class EditPokemonController implements Http.Controller {
  constructor(
    private readonly validation: Validation<EditPokemonController.Request>,
    private readonly editPokemon: EditPokemon
  ) {}

  async handle(
    request: EditPokemonController.Request
  ): Promise<Http.Response<EditPokemonController.Response>> {
    try {
      const badParams = await this.validation.validate({
        id: Number(request.id),
        ...request
      })
      if (badParams) return new HttpError.BadRequest(badParams)

      await this.editPokemon.edit(request)

      return noContent()
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace EditPokemonController {
  export type Request = EditPokemon.Params
  export type Response = EditPokemon.Result
}
