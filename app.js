const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");

mongoose.connect("mongodb+srv://adityaatul:1234567Ak@@cluster0.wmvga.mongodb.net/fd_form?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

const port = 8000;

//DEFINE MONGOOSE SCHEMA
var contactSchema = new mongoose.Schema({
    Name: String,
    Phone_No: String,
    Email: String,
    Message: String

  });

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

//Pug specific stuff
app.set('view engine','pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

 // END POINTS
 app.get("/", (req, res)=>{ 
    const params = {}
    res.status(200).render('home.pug',params);
});
app.get("/sitemap", (req, res)=>{ 
    const params = {}
    res.status(200).render('sitemap.xml',params);
});
app.get('/contact', (req, res)=>{ 
    const params = {}
    res.status(200).render('contact.pug',params);
});
app.get('/promises', (req, res)=>{ 
    const params = {}
    res.status(200).render('promises.pug',params);
});
app.post('/contact', (req, res)=>{ 
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
        }).catch(()=>{
        res.status(400).send("item was not saved to the database")
        })
    //res.status(200).render('contact.pug');
});




app.listen(port,()=>{
    console.log(`This application started at ${port}`);
})
