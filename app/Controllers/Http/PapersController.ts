import { createReadStream } from 'fs'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import pdfmake from 'pdfmake'
import { fileSync } from 'tmp'
import Paper from 'App/Models/Paper'

pdfmake.addFonts({
  Roboto: {
    normal: 'fonts/NotoSerifJP.otf',
    bold: 'fonts/NotoSerifJP.otf',
    italics: 'fonts/NotoSerifJP.otf',
    bolditalics: 'fonts/NotoSerifJP.otf',
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
    await Drive.putStream('first.pdf', createReadStream(tempfile.name), {
      contentType: 'application/pdf',
    })

    const paper = new Paper()
    paper.payload = request.input('payload')

    await paper.save()

    return paper
  }
}
