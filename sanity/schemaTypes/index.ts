import { type SchemaTypeDefinition } from 'sanity'
import { portfolioType } from './portfolioType'
import { deliverableType } from './deliverableType'
import { aboutPageType } from './aboutPageType'
import { servicesPageType } from './servicesPageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioType, deliverableType, aboutPageType, servicesPageType],
}
