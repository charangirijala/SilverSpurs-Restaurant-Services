const exp = require('express')
const usersApi = exp.Router()
const mc = require('mongodb').MongoClient
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multerObj = require('./middlewares/multerCloudinary')

usersApi.get("/getusers", expressAsyncHandler(async (req, res) => {
    let userCollectionObj = req.app.get('userCollectionObj')
    let userObj = await userCollectionObj.find().toArray()
    res.send(userObj)
}))

usersApi.post("/createuser", multerObj.single('photo'), expressAsyncHandler(async (req, res, next) => {

    let userCollectionObj = req.app.get("userCollectionObj")

    //get user obj
    let newUser = JSON.parse(req.body.userObj)

    //search for existing user
    let user = await userCollectionObj.findOne({ username: newUser.username })
    //if user existed
    if (user !== null) {
        res.send({ message: "User already existed" });
    }
    else {
        //hash password
        let hashedPassword = await bcryptjs.hash(newUser.password, 7)
        //replace password
        newUser.password = hashedPassword;
        //add image url
        if (req.file != null) {
            newUser.profileImage = req.file.path;
        }
        delete newUser.photo;
        //insert
        await userCollectionObj.insertOne(newUser)
        res.send({ message: "User created" })
    }
}))



//get user  by username
usersApi.get('/getuser/:username', expressAsyncHandler(async (req, res) => {
    let userCollectionObj = req.app.get('userCollectionObj')
    let reqUsername = req.params.username;
    //check for the username
    let userObj = await userCollectionObj.findOne({ username: reqUsername })
    if (userObj !== null) {
        res.send(userObj)
    }
    else {
        res.send({ message: "user not found" })
    }
}))

//put request
usersApi.put("/updateuser/:username", expressAsyncHandler(async (req, res) => {
    let userCollectionObj = req.app.get('userCollectionObj')
    let modifiedUser = req.params.username
    await userCollectionObj.updateOne({ username: modifiedUser }, { $set: { ...req.body } })
    res.send({ message: "The user updated" })
}))


//delete request
usersApi.delete("/deleteuser/:username", expressAsyncHandler(async (req, res) => {
    let userCollectionObj = req.app.get('userCollectionObj')
    deleteUser = req.params.username
    let userObj = await userCollectionObj.findOne({ username: deleteUser })
    if (userObj === null) {
        res.send({ message: "The user not found" })
    }
    else {
        await userCollectionObj.deleteOne({ username: deleteUser })
        res.send({ message: 'The user deleted successfully' })
    }
}))

//login request
usersApi.post('/login', expressAsyncHandler(async (req, res) => {
    let userCollectionObj = req.app.get('userCollectionObj')
    let credentials = req.body
    let user = await userCollectionObj.findOne({ username: credentials.username })
    if (user === null) {
        res.send({ message: "Invalid username" })
    }
    else {
        //console.log(credentials.password)
        //console.log(user.password)
        let result = await bcryptjs.compare(credentials.password, user.password)
        if (result === false) {
            res.send({ message: "Invalid Password" })
        }
        else {
            //generate a token
            let signedToken = jwt.sign({ username: credentials.username }, 'abcedef', { expiresIn: 120 })
            res.send({ message: "Login Success", token: signedToken, username: credentials.username, userObject: user })
        }
    }
}))


//create a new table booking
usersApi.put("/:username/booknewtable", expressAsyncHandler(async (req, res) => {
    let userCollectionObj = req.app.get('userCollectionObj')
    let modifiedUser = req.params.username
    await userCollectionObj.updateOne({ username: modifiedUser }, { $set: { ...req.body } })
    res.send({ message: "The table booked" })
}))

//create a new order
usersApi.put("/:username/placeorder", expressAsyncHandler(async (req, res) => {
    let userCollectionObj = req.app.get('userCollectionObj')
    let modifiedUser = req.params.username
    await userCollectionObj.updateOne({ username: modifiedUser }, { $set: { ...req.body } })
    res.send({ message: "Order placed successfully" })
}))

//get the previous orders
usersApi.get('/getorders/:username', expressAsyncHandler(async (req, res) => {
    let username = req.params.username
    let userCollectionObj = req.app.get('userCollectionObj')
    let userObj = await userCollectionObj.findOne({ username: username }, { previous_orders: 1 })
    //console.log(userObj.previous_orders)
    res.send(userObj.previous_orders)
}))
//get the previous table bookings 
usersApi.get('/gettablebookings/:username', async (req, res) => {
    let username = req.params.username
    let userCollectionObj = req.app.get('userCollectionObj')
    let userobj = await userCollectionObj.findOne({ username: username })
    let tablebookings = userobj.table_bookings
    res.send(tablebookings)
})

module.exports = usersApi