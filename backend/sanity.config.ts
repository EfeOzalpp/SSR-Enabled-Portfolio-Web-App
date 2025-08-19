import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const structure: StructureResolver = (S) =>
  S.list().title('Content').items([
    S.listItem()
      .title('High Score')
      .child(S.document().schemaType('highScore').documentId('highscore')),
    ...S.documentTypeListItems().filter((li) => li.getId() !== 'highScore'),
  ])

export default defineConfig({
  name: 'default',
  title: 'portfolio-site',
  projectId: 'uyghamp6',
  dataset: 'production',
  plugins: [structureTool({structure}), visionTool()],
  schema: { types: schemaTypes },
})
