const express = require('express');
const app = express();


const cors = require('cors')
app.use(cors({
origin : 'http://localhost:5173'
}))

//import environment varaibles 
require('dotenv').config() 

//import MongoClient
const {MongoClient} = require('mongodb');


//create MongoClient Object
let mClient = new MongoClient(process.env.DB_URL)
//connect to mongodb server
mClient.connect(). 
then((connectionObj)=>{
console.log("db connection success")

//connect to database(fsd)
const fsddb = connectionObj.db('resume-analysis');
//connect to a collection
const usersCollection = fsddb.collection('users')
const resumeCollection = fsddb.collection('resumes')
const recruiterCollection = fsddb.collection('recruiter-feed')



//share collection obj to APIs
app.set('usersCollection', usersCollection);
app.set('resumeCollection', resumeCollection);
app.set('recruiterCollection', recruiterCollection);




//assign port number to http server of express app
app.listen(process.env.PORT, ()=>console.log("http server started on port 4000"))
}).
catch(err=>console.log("error in db connection", err))

//import userApp
const userApp =  require('./APIs/userAPI')
const resumeApp =  require('./APIs/resumeAPI')
const recruiterApp =  require('./APIs/recruiterAPI')



app.use('/user-api', userApp)
app.use('/resume-api', resumeApp)
app.use('/recruiter-api', recruiterApp)






//handling invalid path
app.use('*', (req,res,next)=>{
    res.send({message : `Invalid Path`})
})

//error hadnling middleware
app.use((err,req,res,next)=>{
    res.send({message : "error occured", errorMessage :err.message})
})


