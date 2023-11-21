import z from "zod"

const userSchema = z.object({
  name: z.string().min(3).max(100),
  gmail: z.string().email(),
  password: z.string().min(8).max(50)
})

function userValidator(req,res,next){
  const validation = userSchema.safeParse(req.body)
  if (!validation.success){
    const data= validation.error.issues[0]
    return next({
      name: data.code,
      data
    })
  }

  next()
}

export {userValidator}