var express = require('express');
var router = express.Router();
var Email = require('./emailsModel');



// Return a list of all emails
router.get('/', function(req, res, next) {
    Email.find(function(err, emails) {
        if (err) { return next(err); }
        res.json({'e-mail': emails});
    });
});



// Create a new email
router.post('/', function(req, res, next) {
    var email = new Email(req.body);
    email.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(email);
    });
});

module.exports = router;
