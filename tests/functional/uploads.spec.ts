import { test } from '@japa/runner'

test.group('Uploads', () => {
  test('small file', async ({ client }) => {
    const request = client.post('uploads')

    request.header('Content-Type', 'multipart/form-data')
    request.file('file', 'files/file.txt')

    const response = await request.send()

    response.assertStatus(200)
  })
  test('small file zipped', async ({ client }) => {
    const request = client.post('uploads')

    request.header('Content-Type', 'multipart/form-data')
    request.file('file', 'files/file.zip')

    const response = await request.send()

    response.assertStatus(200)
  })

  test('large file', async ({ client }) => {
    const request = client.post('uploads')

    request.header('Content-Type', 'multipart/form-data')
    request.file('file', 'files/file-large.txt')

    const response = await request.send()

    response.assertStatus(200)
  })
  test('large file zipped', async ({ client }) => {
    const request = client.post('uploads')

    request.header('Content-Type', 'multipart/form-data')
    request.file('file', 'files/file-large.zip')

    const response = await request.send()
    response.assertStatus(200)
  })
})
