require("./models/User");
require("./models/Track")
const express =require('express')
const mongoose=require('mongoose')
const bodyParser =require('body-parser')
const cors=require('cors')
const authRoutes=require('./routes/authRoutes')
const requireAuth =require('./middlewares/requireAuth')
const trackRoutes=require('./routes/trackRoutes')



const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes);


const mongoUri='mongodb+srv://admin:berkant123@cluster0.jwq2k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

if (!mongoUri) {
    throw new Error(
      `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
    );
  }
  
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
mongoose.connection.on("connected",()=>{
    console.log("heyyy connected to mongodb")
})
mongoose.connection.on("error",(err)=>{
    console.log("error connecting to mongodb",err)
})



app.get('/', requireAuth , (req,res)=>{
    res.send(`hello server ${req.user.email}`)
})

const port=process.env.PORT || 5000

app.listen(port, ()=>console.log('server is running',port))

