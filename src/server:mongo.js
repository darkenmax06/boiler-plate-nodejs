import mongoose from "mongoose"

const {
  MONGO_DEVELOPMENT_URI,
  MONGO_PRODUCTION_URI,
  NODE_ENV
} = process.env


let connectionString = NODE_ENV == "development"
? MONGO_DEVELOPMENT_URI
: MONGO_PRODUCTION_URI

try{
  await mongoose.connect(connectionString)
  console.log("database connected")  
}catch(err){
  console.log(err)
}