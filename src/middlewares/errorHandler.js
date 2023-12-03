function errorHandler (err,req,res,next){
	const {name} = err
	console.log('el nombre es: ', name)
	console.log('el error es: ', err)

	const errors = {
		'INVALID_USER_VALIDATE': ()=>res.status(400).json({error: 'tu cuenta ha sido eliminada', logout: true}),
		'JsonWebTokenError':()=> res.status(400).json({error: 'Sus credenciales no estan siendo porporcionadas o no son correctas'}) ,
		'BAD_LOGIN': ()=> res.status(400).json({error: 'La contrasena o el gmail proporcionado no es valido'}) ,
		'INVALID_ID': ()=> res.status(400).json({error: 'La id proporcionada no es valida, el recurso no existe o ya ha sido eliminado'}),
		'REQUIRED_ID': ()=> res.status(400).json({error: 'La id es requerida para realizar esta accion'}),
		// === ZOD ERRORS
		'too_small': ()=>{
			const {minimum, path} = err.data
			const campo = path[0]
			res.status(400).json({error: `el minimo de caracteres de para el campo ${campo} es de ${minimum} caracteres` })
		},
    
		'too_big': ()=>{
			const {maximum, path} = err.data
			const campo = path[0]
			res.status(400).json({error: `el maximo de caracteres de para el campo ${campo} es de ${maximum} caracteres` })
		},
    
		'invalid_string': ()=>{
			const {path} = err.data
			const campo = path[0]
			res.status(400).json({error: `El ${campo} proporcionado no es valido` })
		},
    
		'invalid_type': ()=>{
			const {path} = err.data
			const campo = path[0]
			res.status(400).json({error: `el campo ${campo} es requerido` })
		},
		// === MONGO ERRORS
		'CastError': ()=> res.status(400).json({error: 'la id proporcionada no es una id valida'}),
		'11000': ()=> res.status(400).json({error: 'ya existe una cuenta con este email, por favor ingrese uno nuevo'}),

		// === MYSQL ERRORS
		'ER_DUP_ENTRY': ()=> res.status(400).json({error: 'ya existe una cuenta con este email, por favor ingrese uno nuevo'}),
		'DEFAULT': ()=> res.status(500).json({error: 'ha ocurrido un error con el servidor, por favor notifique al servicio'})
	}

	return errors[name]
		? errors[name]()
		: errors['DEFAULT']()
}

export {errorHandler}