import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('papers', 'PapersController').apiOnly()
}).prefix('api')
