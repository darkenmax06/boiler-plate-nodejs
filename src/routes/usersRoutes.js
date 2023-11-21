import { Router } from 'express'
import { UserController } from '../controller/userController.js'
import { userValidator } from '../middlewares/userValidate.js'

function usersRouter ({userModel}){
	const router = Router()
	const userController = new UserController(userModel)

	router.get('/', userController.getAll)
	router.get('/:id', userController.getById)
	router.post('/', userValidator ,userController.create)
	router.patch('/', userValidator ,userController.update)
	router.delete('/:id' ,userController.delete)

	return router
}

export {usersRouter}



