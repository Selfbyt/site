import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {researchPaperType} from './researchPaperType'
import {caseStudyType} from './caseStudyType'
import {productType} from './productType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType, 
    categoryType, 
    postType, 
    authorType,
    researchPaperType,
    caseStudyType,
    productType
  ],
}
