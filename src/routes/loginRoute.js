import { LoginController } from "../controller/loginController.js";
import { Router } from "express"
import { loginValidate } from "../middlewares/loginValidate.js";


function loginRoute({userModel}){
  const router = Router()
  const loginController = new LoginController(userModel)

  router.post("/", loginValidate,loginController.login)
  return router
}

export {loginRoute}