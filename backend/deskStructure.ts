// /studio/deskStructure.ts
import type {StructureResolver} from 'sanity/structure'

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton editor for "highScore"
      S.listItem()
        .title('High Score')
        .child(
          S.editor()
            .id('highscore')          // UI pane id
            .schemaType('highScore')  // schema name
            .documentId('highscore')  // FIXED singleton id
        ),
      // Everything else, except highScore type (so you can’t create dupes)
      ...S.documentTypeListItems().filter((li) => li.getId() !== 'highScore'),
    ])
