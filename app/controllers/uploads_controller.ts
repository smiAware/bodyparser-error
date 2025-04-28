import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import logger from '@adonisjs/core/services/logger'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'

export default class UploadsController {
  async store({ request }: HttpContext) {
    /**
     * Step 1: Define a file listener
     */
    request.multipart.onFile('*', {}, async (part, reporter) => {
      part.pause()
      part.on('data', reporter)

      part.on('error', (error) => {
        logger.error(error)
      })

      const filePath = app.makePath(part.file.clientName)
      await pipeline(part, createWriteStream(filePath))
      return { filePath }
    })

    /**
     * Step 2: Process the stream
     */
    await request.multipart.process()

    /**
     * Step 3: Access processed files
     */
    return request.allFiles()
  }
}
