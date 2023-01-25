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
// schema validation
const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "nams is requird"],
        maxlength: 10,
        lowercase: true,
        enum: {
            values: ["rejaul", "ramjan","kamal"], // only ey data golo name hisabe dite parbe
            message:"name is not supported"
        }
  },
    location: {
        type: String,
        required: true,
        minlength: 3,
        uppercase: true,
        trim:true, // cleen spass
        
  },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 60,
        unique:true
    },
    email: {
        type: String,
        unique: true
    },
    // custom validation
    number: {
        type: Number,
        required: [true, 'User number number required'],
        validate: {
        validator: function(v) {
          return v>10
        },
         message: props => `${props.value} is not a valid phone number!`
       },
    }
  
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
      age: req.body.age,
      email: req.body.email,
      number:req.body.number,
    })
    await newUsers.save()
    res.status(202).send("data is saved to databass")
  } catch (error) {
   res.status(404).send("data is not saved"+error.message)
  }
})

//=====================================================================
// Routeing heare
// get data data
app.get("/users", async (req, res) => {
    try {
        const user = await Users.find()
        res.status(200).send(user)
    } catch (error) {
         res.status(404).send("data is not saved"+error.message)
    }
    
})

// export file 
module.exports = app;

