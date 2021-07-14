const exp=require('express')
const menuApi=exp.Router()
const expressErrorHandler=require('express-async-handler')
menuApi.use(exp.json())
//get request of menu
menuApi.get('/menu',expressErrorHandler(async (req,res)=>{
    let menuCollectionObj=req.app.get('menuCollectionObj')
    let MenuObj=await menuCollectionObj.find().toArray()
    res.send({MenuObj})
}))

//dealing the synchronous errors
menuApi.use((err,req,res,next)=>{
    res.send({message:`error found err:${err}`})
    next()
})
module.exports=menuApi