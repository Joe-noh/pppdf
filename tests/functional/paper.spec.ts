import { test } from '@japa/runner'

test('generate PDF', async ({ client, assert }) => {
  const response = await client.post('/api/papers').json({ payload: {} })
  const json = response.body()

  assert.exists(json.paper.id)
  assert.exists(json.paper.url)
  assert.equal(response.status(), 201)
})
