import { type SchemaTypeDefinition } from 'sanity'
import { portfolioType } from './portfolioType'
import { deliverableType } from './deliverableType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioType, deliverableType],
}
