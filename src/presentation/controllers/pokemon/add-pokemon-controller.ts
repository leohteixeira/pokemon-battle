import { AddPokemon } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class AddPokemonController implements Http.Controller {
  constructor(
    private readonly validation: Validation<AddPokemonController.Request>,
    private readonly addPokemon: AddPokemon
  ) {}

  async handle(
    request: AddPokemonController.Request
  ): Promise<Http.Response<AddPokemonController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      const result = await this.addPokemon.add({
        tipo: request.tipo,
        treinador: request.treinador
      })

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace AddPokemonController {
  export type Request = AddPokemon.Params
  export type Response = AddPokemon.Result
}
