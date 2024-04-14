import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './deskStructure'
import {codeInput} from '@sanity/code-input'
import {StreamLanguage} from '@codemirror/language'

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_PROJECT_TITLE,

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: 'production',

  plugins: [
    structureTool({
      // Adding my own deskStructure configuration
      structure: myStructure,
    }),
    visionTool(),
    codeInput({
      codeModes: [
        {
          name: 'typescript',
          loader: () =>
            import('@codemirror/lang-javascript').then(({javascript}) =>
              javascript({jsx: false, typescript: true}),
            ),
        },
        {
          name: 'jsx',
          loader: () =>
            import('@codemirror/lang-javascript').then(({javascript}) => javascript({jsx: true})),
        },
        {
          name: 'tsx',
          loader: () =>
            import('@codemirror/lang-javascript').then(({javascript}) =>
              javascript({jsx: true, typescript: true}),
            ),
        },
        {
          name: 'groq',
          loader: () =>
            import('@codemirror/lang-javascript').then(
              ({javascriptLanguage}) => javascriptLanguage,
            ),
        },
        {name: 'java', loader: () => import('@codemirror/lang-java').then(({java}) => java())},
        {
          name: 'yaml',
          loader: () =>
            import('@codemirror/legacy-modes/mode/yaml').then(({yaml}) =>
              StreamLanguage.define(yaml),
            ),
        },
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
