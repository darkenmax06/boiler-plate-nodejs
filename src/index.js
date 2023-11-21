import Express, {json} from 'express'
import { usersRouter } from './routes/usersRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { loginRoute } from './routes/loginRoute.js'

function Server ({userModel}){
	const app = Express()
	app.use(json())

	app.get('/',(req,res) =>{
		res.json({message: 'hello, welcome to the backend'})
	})

	app.use('/api/users',usersRouter({userModel}) )
	app.use('/api/login',loginRoute({userModel}) )

  app.use( errorHandler )

	const PORT = process.env.PORT ?? 3000
	return app.listen(PORT, ()=> console.log(`Server on port ${PORT} http://localhost:${PORT}`))
}

export {Server}