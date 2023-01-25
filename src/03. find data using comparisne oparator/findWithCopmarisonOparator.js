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
// Find all users with comparisom quary Oparator
app.get('/users', async (req, res) => {
  try {

    const usesr =
      // find all data wit comparisom quary oparator
        
      // $lt -> lessthen 
      // await Users.find({ age: { $lt: 24 } })
      
      // $gt -> gaterthen 
      // await Users.find({age:{$gt:24}})
    
      // $eq -> same 
      // await Users.find({ age: { $eq: 24 } })
      
      // $ne -> note same 
      // await Users.find({ age: { $ne: 24 } })
      
      // $gte -> geterthen equal 
      // await Users.find({ age: { $gte: 24 } })
      
      // $lte -> lessthen equal 
      // await Users.find({ age: { $lte: 24 } })
      
      // $in -> tik ay age ta kono iteme e ase kina dakbe 
      // await Users.find({ age: { $in: 24 } })
      
      // $nin -> tik ay age ta sada baki sob golo return kurbe
      await Users.find({ age: { $nin: 24 } })

    res.status(202).send(usesr)
    
  } catch (error) {
    res.status(404).send("data is not found , something worng")
  }

})


// export file 
module.exports = app;





