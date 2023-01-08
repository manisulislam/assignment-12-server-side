const express = require('express');
const jwt = require("jsonwebtoken")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express()
require('dotenv').config()



//middleware 
app.use(cors())
app.use(express.json())




//mongodb connect



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b986vqn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  const WatchesCategoryCollection = client.db('watchesResaleMarket').collection('WatchesCategory')
  const AddProductCollection = client.db('watchesResaleMarket').collection('AddProduct')
  const UsersCollection = client.db('watchesResaleMarket').collection('users')
  const categoryCollection = client.db('watchesResaleMarket').collection('category')
  app.get('/WatchCategory', async(req,res)=>{
    const category_id = req.query.category_id
    console.log(JSON.stringify(category_id))
    
    const query = {category_id: category_id }
    const result = await WatchesCategoryCollection.find(query).toArray()
    console.log(result)
    res.send(result)
  })

  app.get('/users', async(req,res)=>{
    // const email = req.query.email;
    const query = {}
    const result = await UsersCollection.find(query).toArray()
    res.send(result)
  })


  //get user api for api roles purpose

  app.get('/roleUser', async(req, res)=>{
    const query= {};
    const result = await UsersCollection.find(query).toArray();
    console.log(result)
    res.send(result)
  })

  //category section api
  app.get('/category', async(req,res)=>{
    // const id = req.params.id


    
    const query = {}
    const result = await categoryCollection.find(query).toArray()
    res.send(result)
  })

  //jwt token api below
  app.get('/jwt', async(req,res)=>{
    const email = req.query.email;
    const query = {email: email}
    const user = await UsersCollection.findOne(query)
    if(user){
      const token = jwt.sign({email}, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
      return res.send({accessToken:token})

    }
    console.log(user)
    res.status(403).send({accessToken: ''})
    
  })
  app.post('/users', async(req, res)=>{
    const users = req.body;
    const result = await UsersCollection.insertOne(users)
    res.send(result)
  })

  
//addporduct api below
  app.post('/addProduct', async(req,res)=>{
    const product = req.body;
    console.log(product)
    const result = await AddProductCollection.insertOne(product)
    res.send(result)
  })

//myporduct page getapi below
app.get('/myProduct',async(req,res)=>{
  const query ={};
  const result = await AddProductCollection.find(query).toArray()
  res.send(result)
  
})

//myProduct page product delete api below
app.delete('/myProduct/:id', async(req,res)=>{
  
  const id = req.params.id
  console.log(id)
})

}
run().catch(error=> console.log(error))



app.get('/', (req,res)=>{
    res.send('server side create successfully')
})

app.listen(port, ()=>{
    console.log(`anis completely setup server ${port}`)
})