import { LoginController } from "../controller/loginController.js";
import { Router } from "express"


function loginRoute({userModel}){
  const router = Router()
  const loginController = new LoginController(userModel)

  router.post("/", loginController.login)
  return router
}

export {loginRoute}