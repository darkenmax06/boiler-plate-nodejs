import mysql from 'mysql2/promise'
import 'dotenv/config'
import { UserModel } from './models/mysql/user.js'
import { Server } from './index.js'

// Este seria el fichero de coneccion con mysql

// Aqui estamos extrayendo las variables de entorno necesarias
// para poder conectarnos con mysql
const {	
	MYSQL_DEVELOPMENT_URI,	
	MYSQL_PRODUCTION_URI, 
	NODE_ENV 
} = process.env

// Dependiendo del entorno en el que se ejecute usara una base de datos
// u otra, (estos entornos se definen en el package.json)
let connectionString = NODE_ENV == 'development'
	? MYSQL_DEVELOPMENT_URI
	: MYSQL_PRODUCTION_URI


let connection = null

try{
	connection = await mysql.createConnection(connectionString)
	console.log('=== MYSQL === // database connected')
}catch (err){
	console.log(err)
}

// definimos los modelos de la base de datos, yq que estamos utilizando
// una arquitectura mvc, le pasamos los modelos por injeccion de dependencias
const userModel = new UserModel(connection)

Server({userModel})