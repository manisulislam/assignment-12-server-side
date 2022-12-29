const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express()



//middleware 
app.use(cors())
app.use(express())


app.get('/', (req,res)=>{
    res.send('server side create sucessfully')
})

app.listen(port, ()=>{
    console.log(`anis completely setup server ${port}`)
})