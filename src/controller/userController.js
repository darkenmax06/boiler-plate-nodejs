
class UserController{
	constructor(userModel){
		this.userModel = userModel
	}

	getAll = async (req,res,next) =>{
		try{
			const users = await this.userModel.getAll()
			res.json(users)
		}catch(err){
			return next(err)
		}
	}

	getById = async (req,res,next) =>{
    const {id} = req.params
    if (!id) next({name: "REQUIRED_ID"})

		try{
			const user = await this.userModel.getById({id})
			res.json(user)
		}catch(err){
			return next(err)
		}
	}

	create = async (req,res,next) =>{
    const {name,gmail,password} = req.body
    console.log(req.body)
		try{
			const user = await this.userModel.create({name,gmail,password})
			res.json(user)
		}catch(err){
      if (err.code){
        return next({
          name: err.code
        })
      }

      return next( err)
		}
	}

  update = async (req,res,next) =>{
    const {name,gmail,password} = req.body
    console.log(req.body)
		try{
			const user = await this.userModel.update({name,gmail,password})
			res.json(user)
		}catch(err){
      if (err.code){
        return next({
          name: err.code
        })
      }

      return next( err)
		}
	}

  delete = async (req,res,next) =>{
    const {id} = req.params
    if (!id) next({name: "REQUIRED_ID"})

		try{
			const user = await this.userModel.delete({id})
			res.status(204).end()
		}catch(err){
      next( err)
		}
	}
}

export {UserController}