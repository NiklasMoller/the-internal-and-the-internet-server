var express = require('express');
var router = express.Router();
var PeripheryAssociation = require('./peripheryAssociationsModel');


// Return a list of all associations
router.get('/', function(req, res, next) {
    PeripheryAssociation.find(function(err, association) {
        if (err) { return next(err); }
        res.json({'association': association});
    });
});


// Create a new association
router.post('/', function(req, res, next) {
    var association = new PeripheryAssociation(req.body);
    association.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(association);
    });
});

module.exports = router;
