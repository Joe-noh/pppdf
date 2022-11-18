import { createReadStream } from 'fs'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import pdfmake from 'pdfmake'
import { fileSync } from 'tmp'
import Paper from 'App/Models/Paper'

pdfmake.addFonts({
  Roboto: {
    normal: '/usr/local/share/fonts/NotoSerifCJKjp-Regular.otf',
    bold: '/usr/local/share/fonts/NotoSerifCJKjp-Bold.otf',
    italics: '/usr/local/share/fonts/NotoSerifCJKjp-Regular.otf',
    bolditalics: '/usr/local/share/fonts/NotoSerifCJKjp-Bold.otf',
  },
})

export default class PapersController {
  public async show({ params }: HttpContextContract) {
    return await Paper.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const docDef = { content: ['This is an sample ピーディーエフ printed with pdfMake'] }
    const doc = pdfmake.createPdf(docDef)
    const tempfile = fileSync()

    await doc.write(tempfile.name)
    await Drive.putStream('documents/first.pdf', createReadStream(tempfile.name), {
      contentType: 'application/pdf',
    })

    const paper = new Paper()
    paper.payload = request.input('payload')
    paper.pdf = 'documents/first.pdf'

    await paper.save()

    return paper
  }
}
