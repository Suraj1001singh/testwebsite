const express=require("express");
const path= require("path");
const fs=require("fs");
const { execPath } = require("process");
const app =express();
const port=8000;
const bodyparser=require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

//Defining mongoose schemma for database
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    age: String,
    address: String
  });
const Contact = mongoose.model('Contact', contactSchema);


//Express specific stuff
app.use('/static',express.static('static'))// for serving static files
app.use(express.urlencoded());

//Pug specific stuff
app.set('view engine','pug')// set the template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views dir

//Endpoints
app.get('/',(req,res)=>{
    const con="join our academy best in class"
    const params={'title':'Dance website','content':con};
    res.status(200).render('home.pug',params);

})
app.get('/contact',(req,res)=>{
    
    const params={};
    res.status(200).render('contact.pug',params);

})
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item  has been saved to database")
    }).catch(()=>{
        res.status(400).send("Items was not saved in database")
    })
    
    // res.status(200).render('contact.pug');

})

//Starting Server
app.listen(port,()=>{
    console.log(`server is started in port ${port}`);
})
