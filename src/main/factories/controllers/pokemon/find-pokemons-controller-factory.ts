import { makeFindPokemons } from '@/main/factories/usecases'
import { FindPokemonsController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeFindPokemonsController = (): Http.Controller => {
  const findPokemons = makeFindPokemons()
  return new FindPokemonsController(findPokemons)
}
