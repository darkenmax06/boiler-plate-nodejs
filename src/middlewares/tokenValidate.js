import jwt from 'jsonwebtoken'


class Token {
	constructor (userModel){
		this.userModel = userModel
	}

	validate = async (req,res,next) =>{
		const {authorization} = req.headers
		let token = null
  
		if (authorization && authorization.toLowerCase().startsWith('bearer') ){
			token = authorization.substring(7)
		}
  
		let decodeToken = {}
		try {
			decodeToken = jwt.verify(token, process.env.SECRET_KEY)
		} catch (err){
			return next(err)
		}


		try{
			const user = await this.userModel.getById({userId: decodeToken.userId})
			req.user = user 
			next()
		}catch(err){
			if (err.name == 'INVALID_ID' || err.name == 'CastError') next({name:'INVALID_USER_VALIDATE' })
			else next(err)
		}
    
	}
}

export {Token}