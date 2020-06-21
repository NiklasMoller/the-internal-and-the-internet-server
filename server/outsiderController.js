var express = require('express');
var router = express.Router();
var OutsiderAssociation = require('./outsiderAssociationsModel');


// Return a list of all association
router.get('/', function(req, res, next) {
    OutsiderAssociation.find(function(err, association) {
        if (err) { return next(err); }
        res.json({'association': association});
    });
});


// Create a new association
router.post('/', function(req, res, next) {
    var association = new OutsiderAssociation(req.body);
    association.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(association);
    });
});

module.exports = router;
