const express = require('express')
const app = express()
const mongoose = require('mongoose');
app.use(express.json())


// ======================================================================
//01. connect mongodb
const mongoDBConnect = async () => {
  try {
   await mongoose.connect('mongodb+srv://learnDB:rejaul1200@cluster0.5t4ugsq.mongodb.net/learnDB')
    console.log("database is connected");
  } catch (error) {
   console.log("db is not connected "+error.message);
  }
}
mongoDBConnect()


// ======================================================================
//02. create a schema
const usersSchema = mongoose.Schema({
  name: String,
  location: String,
  age:Number
})


// ======================================================================
//03. create a model
const Users =  mongoose.model("usersData",usersSchema)

//=====================================================================
// Routeing heare
// post route for users ->model using here 
app.post("/users", async (req, res) => {
  try {
      const newUsers = await new Users({
      name:  req.body.name,
      location:req.body.location,
      age:req.body.age
    })
    await newUsers.save()
    res.status(202).send("data is saved to databass")
  } catch (error) {
   res.status(404).send("data is not saved"+error.message)
  }
})

//=====================================================================
// Routeing heare
// get route , finding...
// Find all users with Losical quary Oparator
app.get('/users', async (req, res) => {
  try {

    const usesr =
      
     // Losical $or oparator -> {$or:[{age: {$gt:20}}, {location:{$in:"Cox's Bazar"}}]}
    //  await Users.find({$or:[{age: {$gt:25}}, {location:{$in:"ukhia"}}]})

    // Losical $and oparator -> {$and:[{age: {$gt:20}}, {location:{$in:"Cox's Bazar"}}]}
    // await Users.find({$and:[{age: {$gt:25}}, {location:{$in:"Cox's Bazar"}}]})
      
    // Losical $nor oparator -> {$and:[{age: {$gt:20}}, {location:{$in:"Cox's Bazar"}}]}
    await Users.find({$nor:[{age: {$gt:22}}, {name:{$in:"Kamal Mia"}}]})
    res.status(202).send(usesr)
    
  } catch (error) {
    res.status(404).send("data is not found , something worng")
  }

})

// export file 
module.exports = app;

