import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

class UserModel {
	constructor (connection){
		this.connection = connection
	}

	getAll = async ()=>{
		const [users] = await this.connection.query(
			'SELECT BIN_TO_UUID(userId) userId, name, gmail FROM users'
		)
		return users
	}

  getById = async ({id})=>{    
    const [[{isValidId}]] = await this.connection.query(
    'SELECT IS_UUID(?) isValidId',
    [id]
  )

  if (!isValidId) throw {name: "INVALID_ID"}
		const [[user]] = await this.connection.query(
			'SELECT BIN_TO_UUID(userId) userId, name, gmail FROM users WHERE userId = UUID_TO_BIN(?) ',
      [id]
		)
		return user
	}

  login = async ({password, gmail})=>{
    const [[savedUser]] = await this.connection.query(
      "SELECT BIN_TO_UUID(userId) userId, name, gmail, password FROM users WHERE gmail = ?",
      [gmail]
    )

    const isCorrectPassword = savedUser
    ? await compare(password,savedUser.password)
    : false

    if (!isCorrectPassword) throw {name: "BAD_LOGIN"}

    const token = jwt.sign({
      userId: savedUser.userId
    },  process.env.SECRET_KEY)

    const {password:p, ...restOfUser} = savedUser


    const user = {
      ...restOfUser,
      token
    }

    return user
	}

  create = async ({name, password, gmail})=>{
    const SALT_ROUNDS=10
    const passwordHash = await hash(password,SALT_ROUNDS)
    const [[{id}]] = await this.connection.query("SELECT UUID() id")
    console.log("id",id)

    await this.connection.query(
      `INSERT INTO users (userId, name,password,gmail) 
      values (UUID_TO_BIN(?),?,?,?);`,
      [id,name,passwordHash,gmail]
    )

    const [[user]] = await this.connection.query(
      'SELECT BIN_TO_UUID(userId) id, name, gmail FROM users where userId = UUID_TO_BIN(?) ',
      [id]
    )

    return user

	}

  update = async ({name, password, gmail})=>{
    const SALT_ROUNDS=10
    const passwordHash = await hash(password,SALT_ROUNDS)
    const [[{id}]] = await this.connection.query("SELECT UUID() id")
    console.log("id",id)

    await this.connection.query(
      `UPDATE users SET name = ?,password = ?, gmail =? WHERE gmail = ?`,
      [name,passwordHash,gmail,gmail]
    )

    const [[user]] = await this.connection.query(
      'SELECT BIN_TO_UUID(userId) id, name, gmail FROM users WHERE gmail = ? ',
      [gmail]
    )

    return user

	}

  delete = async ({id})=>{
    const [[{isValidId}]] = await this.connection.query(
      'SELECT IS_UUID(?) isValidId',
      [id]
    )

    if (!isValidId) throw {name: "INVALID_ID"}

    await this.connection.query(
      'DELETE FROM users WHERE userId = UUID_TO_BIN(?) ',
      [id]
    )

    return null

	}
}

export {UserModel}