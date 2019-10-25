'use strict'

var express = require('express');
var UserController = require ('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/imgUser'});

 api.post('/login', UserController.login);
 api.post('/registra-usuario', UserController.registraUsuario);
 api.get('/busca-por-mail/:email', UserController.buscaPorMail); //se usa en la pagina de recuperar y se envia el mail
 api.get('/busca-por-id/:id', UserController.buscaPorId);
 api.get('/usuarios-paginados',[md_auth.ensureAuth,md_auth.ensureAdmin], UserController.usuariosPaginados);
 api.get('/usuarios-todos',[md_auth.ensureAuth,md_auth.ensureAdmin], UserController.usuariosTodos);
 api.put('/update-user/:id',[md_auth.ensureAuth,md_auth.ensureAdminIgualUsuario],UserController.updateUser);
 api.put('/update-user-password/:id',UserController.updateUserPassword);
 api.put('/upload-image-user/:id',[md_auth.ensureAuth,md_auth.ensureAdminIgualUsuario, md_upload],UserController.uploadImage);
 api.get('/get-image-user/:imageFile',UserController.getImageFile);
 api.delete('/remove-user/:id',[md_auth.ensureAuth,md_auth.ensureAdmin], UserController.deleteUser);
 api.get('/renuevatoken',md_auth.ensureAuth, UserController.renuevaToken);
 
module.exports = api;