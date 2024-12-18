const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const VintageController = require("./Controller/VintageController")
//Name of the model to be imported from the model class
const Vintage = require("./model/VintageModel");

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/new_db",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("Database Successfully Connected"))
.catch((err)=>console.log(err));

app.get("/", VintageController.displayAllItems);

app.get("/create", VintageController.createNew_get);

app.post("/create", VintageController.createNew_post);
    

app.get("/getbyname", (req, res) => {
    const name = req.query.item_name;
    Vintage.findOne({ "item_name": name })
    .then((result) => {
        if (result) {
            res.render("view", { newVintage: result });
        } else {
            res.status(404).send("Item not found");
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send("Internal Server Error");
    });
});


// Route to handle the edit page and render the edit form
app.get("/edit/:id", VintageController.update_get);

app.post("/update/:id",VintageController.update_post);


app.post("/delete/:id",VintageController.DeleteById);


app.listen(8080,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`The application is successfully running on port localhost:8000`);
    }

})

