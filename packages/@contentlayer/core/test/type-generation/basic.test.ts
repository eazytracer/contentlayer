import { defineDocumentType, fromLocalContent } from 'contentlayer/source-local'

import { renderTypes } from '../../src/generation/generate-types'

test.todo('generate-types')

const TestPost = defineDocumentType(() => ({
  name: 'TestPost',
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
  },
  computedFields: {
    slug: { type: 'string', resolve: (_) => _._id.replace('.md', '') },
  },
}))

// TODO rewrite test for gendotpkg
describe('generate-types', () => {
  test('simple schema', async () => {
    const sourcePlugin = await fromLocalContent({ documentTypes: [TestPost], contentDirPath: '' })
    const schemaDef = await sourcePlugin.provideSchema()
    const typeSource = renderTypes({ schemaDef, sourcePluginType: 'local' })
    expect(typeSource).toMatchSnapshot()
  })
})
