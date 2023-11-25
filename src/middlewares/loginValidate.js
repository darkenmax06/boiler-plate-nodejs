import { z } from "zod";


const loginSchema = z.object({
  gmail: z.string().email(),
  password: z.string().min(8).max(50)
})

function loginValidate (req,res,next){
  const validation = loginSchema.safeParse(req.body)
  if (!validation.success){
    const data = validation.error.issues[0]
    return next({
      name: data.code,
      data
    })

  }

  next()
}

export {loginValidate}