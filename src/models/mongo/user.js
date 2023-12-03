import { hash,compare } from 'bcrypt'
import { Schema,model } from 'mongoose'
import jwt from 'jsonwebtoken'

const schema = new Schema({
	name: String,
	gmail: {
		type: String,
		unique: true
	},
	password: String
})

schema.set('toJSON', {
	transform: (document,returnedObject) => {
		returnedObject.userId = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}
})

const User = model('User', schema)

class UserModel {
	async getAll(){
		const users = await User.find()
		return users
	}

	getById = async ({userId}) =>{
		const users = await User.findById(userId)
		if (!users) throw {name: 'INVALID_ID'}
		return users
	}

	login = async ({password, gmail})=>{
		const user = await User.findOne({gmail})
    
		const isCorrectPassword = user
			? await compare(password ,user.password)
			: false

		if (!isCorrectPassword) throw {name: 'BAD_LOGIN'}

		const token = jwt.sign({
			userId: user.toJSON().userId
		},  process.env.SECRET_KEY)

		
		const usetToSend = {
			...user.toJSON(),
			token
		}

		return usetToSend
	}

	create = async ({name, gmail, password}) =>{
		const SALT_ROUNDS = 10
		const passwordHash = await hash(password,SALT_ROUNDS)

		const newUser = new User({name, gmail, password: passwordHash})
		const user = await newUser.save()
		return user
	}

	async update ({name,gmail,password,userId}){
		const findedUser = await User.findById(userId)
		if (!findedUser) throw {name: 'INVALID_ID'}

		const SALT_ROUNDS = 10
		const passwordHash = await hash(password,SALT_ROUNDS)
    
		const newUser = Object.assign(
			findedUser,
			{name,gmail,password:passwordHash}
		)

		const user = await newUser.save()
		return user
	}

	async delete ({userId}){
		const userExitst = await User.findById(userId)
		if (!userExitst) throw {name: 'INVALID_ID'}
		await User.findByIdAndDelete(userId)
		return null
	}
}

export {UserModel}