import { FindPokemons } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'

export class FindPokemonsController implements Http.Controller {
  constructor(private readonly findPokemons: FindPokemons) {}

  async handle(): Promise<Http.Response<FindPokemonsController.Response>> {
    try {
      const result = await this.findPokemons.find()

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace FindPokemonsController {
  export type Response = FindPokemons.Result
}
