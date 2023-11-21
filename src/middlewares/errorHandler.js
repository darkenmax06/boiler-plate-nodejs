function errorHandler (err,req,res,next){
  const {name} = err
  console.log("el nombre es: ", name)
  console.log("el error es: ", err)

  const errors = {
    "INVALID_ID": ()=> res.status(400).json({error: 'La id proporcionada no es valida o el recurso ya ha sido eliminado'}),
    "REQUIRED_ID": ()=> res.status(400).json({error: 'La id es requerida para realizar esta accion'}),
    // === ZOD ERRORS
    "too_small": ()=>{
      const {minimum, path} = err.data
      const campo = path[0]
      res.status(400).json({error: `el minimo de caracteres de para el campo ${campo} es de ${minimum} caracteres` })
    },
    
    "too_big": ()=>{
      const {maximum, path} = err.data
      const campo = path[0]
      res.status(400).json({error: `el maximo de caracteres de para el campo ${campo} es de ${maximum} caracteres` })
    },
    
    "invalid_string": ()=>{
      const {path} = err.data
      const campo = path[0]
      res.status(400).json({error: `El ${campo} proporcionado no es valido` })
    },
    
    "invalid_type": ()=>{
      const {path} = err.data
      const campo = path[0]
      res.status(400).json({error: `el campo ${campo} es requerido` })
    },
    // === MYSQL ERRORS

    "ER_DUP_ENTRY": ()=> res.status(400).json({error: "este email ya existe, por favor ingrese uno nuevo"}),
    "DEFAULT": ()=> res.status(500).json({error: "ha ocurrido un error con el servidor, por favor notifique al servicio"})
  }

  return errors[name]
  ? errors[name]()
  : errors['DEFAULT']()
}

export {errorHandler}