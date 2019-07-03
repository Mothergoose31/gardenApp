const express = require('express');
const db = require('../models');
const router = express.Router();


// get vegetable 

//Create A new Garden 
router.get('/',function(req,res){
    db.garden.findAll().then(function(gardens){
        res.json(gardens)
    })
});

// GET /gardens/new - display form for creating a new garden
router.get('/new',function(req,res){
    res.render('gardens/new')
}); 

// post /gardens to  garden
router.post('/',function(req,res){
    db.garden.create({
        userId:req.user.id,
        theme: req.body.theme,
        location: req.body.location
    }).then(function (garden) {
        res.redirect('/profile')
    })
})










//Delete a garden

app.delete('/gardens/:id',function(req,res){
    //Read the data from the file 
    // let gardens = fs.readFileSync('./gardens.json');
    //parse the data into a object
    // let gardenData = JSON.parse(gardens);
    let id = parseInt(req.params.id);
    gardenData.splice(id,1);
module.exports = router;
});