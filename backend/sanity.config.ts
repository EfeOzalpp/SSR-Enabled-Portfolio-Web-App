// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'portfolio-site',
  projectId: 'uyghamp6',
  dataset: 'production',
  // No custom structure — just the defaults
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
