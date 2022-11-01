import { Pokemon } from '@/domain/models'
import { Invalidation } from '@/validation/helpers'
import { Validator } from '@/validation/protocols'

export class PokemonTypeValidator implements Validator {
  async validate(subtype: string): Promise<void | string> {
    if (
      !Object.values(Pokemon.PokemonType).includes(
        subtype as Pokemon.PokemonType
      )
    ) {
      return Invalidation.pattern()
    }
  }
}
