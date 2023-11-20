import Express, {json} from 'express'

function Server (){
	const app = Express()
	app.use(json())

	app.get('/',(req,res) =>{
		res.json({message: 'hello, welcome to the backend'})
	})

	const PORT = process.env.PORT ?? 3000
	return app.listen(PORT, ()=> console.log(`Server on port ${PORT} http://localhost:${PORT}`))
}

export {Server}