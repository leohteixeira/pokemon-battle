import { Invalidation } from '@/validation/helpers'
import { PokemonTypeValidator } from '@/validation/validators'

const makeSut = (): PokemonTypeValidator => new PokemonTypeValidator()

describe('EventSubtype Validator', () => {
  test.each(['charmander', 'pichu', 'mew'])(
    'Should return pattern error if param is not a valid pokemon type',
    async (subtype) => {
      const sut = makeSut()
      const result = await sut.validate(subtype)
      expect(result).toEqual(Invalidation.pattern())
    }
  )

  test.each(['charizard', 'pikachu', 'mewtwo'])(
    'Should return void if param is a valid pokemon type',
    async (subtype) => {
      const sut = makeSut()
      const result = await sut.validate(subtype)
      expect(result).toBeUndefined()
    }
  )
})
