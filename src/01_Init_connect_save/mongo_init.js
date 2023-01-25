const express = require('express')
const app = express()
const mongoose = require('mongoose');


/**
 * useing mongodb
 * requere mongose -> connect mongose with server -> create schema -> create model -> using model -> save model data to databass
 * 
 */

// enable json data
app.use(express.json())

// enable for form data
app.use(express.urlencoded({extended:true}))

// Home route 
app.get('/', (req, res) => {
  res.send('Hello World!')
})


// ===============================================================================
// 01: Mongobd databass connaction with mongose
mongoose.connect('mongodb://127.0.0.1:27017/learnMongodb').then(res => {
    console.log("database is connected");
}).catch(error => {
    console.log("db is not connected "+error.message);
})

// ==============================================================================
// 02: create prodact schema
const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required:true,
  },
  price: Number,
  discription: String,
  createAt: {
    type: Date,
    default:Date.now(),
  }
})
// =================================================================================
// 03: create prodact model
const prodacts = mongoose.model("prodacts",productsSchema)


// Post route
app.post('/products', async (req, res) => {
  
  try {
    const title = req.body.title
    const price = req.body.price
    const discription = req.body.discription
  // =================================================================================
    // 04 useing model
    const newProdact = new prodacts({
      title:title,
      price:price,
      discription:discription
    })

    // ==================================================================================
    // 05 save to databass data 
    const prodactData = await newProdact.save()



/**
    // anether way , save data to databass with out using model 
    // send many data tith insertMany mathod
    const prodactData = await prodacts.insertMany([
        {
          title: "iphone 12",
          price: 1200,
          discription:'new phone '
      },
      {
          title: "iphone 13",
          price: 1300,
          discription:'new phone '
      },
      {
          title: "iphone 11",
          price: 1500,
          discription:'new phone '
        },
      ])
 */

    // send response 
    res.status(201).send({prodactData})
  } catch (error) {
    res.status(404).send({message:error.message})
  }
})


module.exports = app;












