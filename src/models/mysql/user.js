

class UserModel {
	constructor (connection){
		this.connection = connection
	}

	async getAll (){
		const [users] = await this.connection.query(
			'SELECT BIN_TO_UUID(userId) userId, name, gmail FROM users'
		)
		return users
	}
}

export {UserModel}