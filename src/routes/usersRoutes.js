import { Router } from 'express'
import { UserController } from '../controller/userController.js'
import { userValidator } from '../middlewares/userValidate.js'
import { Token } from '../middlewares/tokenValidate.js'

function usersRouter ({userModel}){
	const router = Router()
	const userController = new UserController(userModel)
	const token = new Token(userModel)

	router.get('/', userController.getAll)
	router.get('/:userId', token.validate,userController.getById)
	router.post('/', userValidator ,userController.create)
	router.patch('/:userId', token.validate ,userValidator ,userController.update)
	router.delete('/:userId' , token.validate,userController.delete)

	return router
}

export {usersRouter}



