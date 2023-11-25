
class LoginController{
  constructor (userModel){
    this.userModel = userModel
  }

  login = async (req,res,next)=>{
    const {gmail,password} = req.body
    try{
      const user = await this.userModel.login({gmail,password})
      res.json(user)
    }catch(err){
      next(err)
    }
  }
}

export {LoginController}