const exp=require('express')
const app=exp()
const path=require('path')
const mc=require('mongodb')
require('dotenv').config()
//connecting to angular application
app.use(exp.static(path.join(__dirname, './dist/RestaurantServices')))

//import the menu api
const menuApi=require('./APIS/menu')
const usersApi=require('./APIS/users')


//connect to mongodb to make a single db connection for all APIS
const databaseUrl=process.env.DATABASE_URL;

mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log('Error in connecting to the Database')
    }
    else{
        let userdatabaseObj=client.db('usersdb')
        let userCollectionObj = userdatabaseObj.collection('usercollection')
        let menudatabaseObj=client.db('RestaurantMenu')
        let menuCollectionObj=menudatabaseObj.collection('menu')
        app.set("userCollectionObj",userCollectionObj)
        app.set("menuCollectionObj",menuCollectionObj)

        console.log("connected to the database....")
    }
})
//add body parsing middleware
app.use(exp.json());

//creating the routes
app.use("/restaurant",menuApi)
app.use("/users",usersApi)


//error handling for wrong path
app.use((req,res,err)=>{
    res.send({message:`Invalid path ${req.url}`})
})

//assigning the port number
let portnumber=process.env.PORT || 8080
app.listen(portnumber,()=>{
    console.log(`The server listening on port ${portnumber}....`)
})