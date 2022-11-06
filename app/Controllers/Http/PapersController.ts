import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Paper from 'App/Models/Paper'

export default class PapersController {
  public async show({ params }: HttpContextContract) {
    return await Paper.findOrFail(params.id)
  }

  public async store({ request }: HttpContextContract) {
    const paper = new Paper()
    paper.payload = request.input('payload')

    await paper.save()

    return paper
  }
}
