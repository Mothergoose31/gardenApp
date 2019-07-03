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

// Add a vegetable to a garden
router.post("/:gid/vegetables", function(req, res) {
    console.log("hit the route...");
    db.garden.findByPk(req.params.gid).then(function(garden) {
        db.vegetable.create({
            name: req.body.vid
        }).then(function(veg) {
            garden.addVegetable(veg).then(function(data) {
                res.redirect('/gardens/' + garden.id);
            })
        })
    })
})


//get a specific garden
router.get('/:id', function(req,res){
    db.garden.findOne({
        where: {id: req.params.id},
        include: [db.vegetable]
    }).then(function(garden){
        res.render('gardens/show',{garden:garden});
    });
})

//Delete a garden

router.delete('/gardens/:id',function(req,res){

    let id = parseInt(req.params.id);
    gardenData.splice(id,1);
});

module.exports = router;

//Delete a Vegetable