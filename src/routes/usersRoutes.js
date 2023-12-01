import { Router } from 'express'
import { UserController } from '../controller/userController.js'
import { userValidator } from '../middlewares/userValidate.js'

function usersRouter ({userModel}){
	const router = Router()
	const userController = new UserController(userModel)

	router.get('/', userController.getAll)
	router.get('/:userId', userController.getById)
	router.post('/', userValidator ,userController.create)
	router.patch('/:userId', userValidator ,userController.update)
	router.delete('/:userId' ,userController.delete)

	return router
}

export {usersRouter}



