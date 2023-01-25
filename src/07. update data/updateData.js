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
// updata data data
app.put("/users/:id", async (req, res) => {
    try {
        const id = req.params.id
        
        const user =
            
            // update data by updateOne mathod
            // await Users.updateOne({ _id: id },{
            //     $set: {
            //         name:'Im updated Name'
            //     }
            // })

           // update data by updateOne mathod
            await Users.findByIdAndUpdate({ _id: id },{
                $set: {
                    name:'Im updated Name'
                },
            },
                { new: true }
            )
        
        res.status(200).send({
            message: "secsessfully updated",
            data:user
        });
    } catch (error) {
         res.status(404).send("data is not saved"+error.message)
    }
    
})

// export file 
module.exports = app;

