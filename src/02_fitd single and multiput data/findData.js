const express = require('express')
const app = express()
const mongoose = require('mongoose');
app.use(express.json())

// ======================================================================
//01. connect mongodb
const mongoDBConnect = async () => {
  try {
   await mongoose.connect('mongodb://127.0.0.1:27017/finddb')
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


// ======================================================================
//04. using model
// const newUsers = new users({
//   name: 'rejsul',
//   location: `Cox's Bazar`,
//   age:20
// })

// ======================================================================
//05. save data to databass
// newUsers.save()



//=====================================================================
// Routeing heare
// post route for user
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
// Find all users
app.get('/users', async (req, res) => {
  try {

    const usesr =
      // find all data
      // await Users.find()

      // find data with limit
        await Users.find().limit(2)
    
    res.status(202).send(usesr)
    
  } catch (error) {
    res.status(404).send("data is not found , something worng")
  }

})

// get rout -> find user by id
app.get('/users/:id', async (req, res) => {

  const id = req.params.id;

  try {
    // find user by id 
    const usesr =
      // find user by id with: `find` mathod -> retunt [array]
      // await Users.find({ _id: id })

      // find user by id with: `findOne` mathod -> retunt {boject}
      // await Users.findOne({ _id: id });
      
      // find user by id with: `findOne.Select({})` mathod -> 
      // jodi ey item er specipic kono proparty nadekte cay :0 , ba dakte cay:1 
      
      // await Users.findOne({ _id: id }).select({
      //   _id: 0,
      //   name:1,
      // });
      
      // same work anather awa `findOne({}.{})` -> this is more simple
      await Users.findOne({_id:id},{name:1,_id:0})
      
    
    res.status(202).send(usesr);
      
  } catch (error) {
    res.status(404).send("data is not found , something worng");
  }

})






// export file 
module.exports = app;









