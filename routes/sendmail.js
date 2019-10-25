'use strict'

var express = require('express');
var SendmailController = require ('../controllers/sendmail');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

 api.post('/sendmail', SendmailController.sendMail);
 
 
module.exports = api;