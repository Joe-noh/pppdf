import { createReadStream } from 'fs'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import pdfmake from 'pdfmake'
import { v4 as uuidv4 } from 'uuid'
import { fileSync } from 'tmp'
import Paper from 'App/Models/Paper'

export default class PapersController {
  public async show({ params }: HttpContextContract) {
    return await Paper.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const docDef = {
      content: ['This is an sample ピーディーエフ printed with pdfMake'],
      defaultStyle: {
        font: 'NotoSerifJP',
      },
    }
    const doc = pdfmake.createPdf(docDef)
    const tempfile = fileSync()
    const pdfFilename = uuidv4() + '.pdf'

    await doc.write(tempfile.name)
    await Drive.putStream(`documents/${pdfFilename}`, createReadStream(tempfile.name), {
      contentType: 'application/pdf',
    })

    const paper = new Paper()
    paper.payload = request.input('payload')
    paper.pdf = `documents/${pdfFilename}`

    await paper.save()

    return paper
  }
}
