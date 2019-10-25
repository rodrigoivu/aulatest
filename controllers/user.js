'use strict'

 var fs = require('fs');
 var path = require('path');
 var bcrypt = require('bcryptjs');
 var User = require('../models/user');
 var jwt = require('../services/jwt');
 //var menu = require('../controllers/menu')

 //================================================
// RENUEVA TOKEN
//================================================
function renuevaToken(req,res){
    var token=jwt.createToken(req.user);
	res.status(200).send({
		token: token
	});

}

//================================================
// LOGIN
//================================================
function login(req,res){
	var params = req.body;
	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase()}, (err,userLogin) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!userLogin){
				res.status(404).send({message: 'El usuario no existe'});
			}else{
				//Comprobar la contraseña
				if( bcrypt.compareSync( password,userLogin.password) ){
					//devolver los datos del usuario logueado
					if(params.gethash){
						// devolver un token de jwt
						userLogin.password='protegida';//No envía el password
						res.status(200).send({
						id:	userLogin._id,
						user: userLogin,	
						token: jwt.createToken(userLogin),
					});
					}else{
						res.status(200).send({userLogin});
					}

				}else{
						res.status(404).send({message: 'El usuario no ha podido loguearse'});
				}
			}
		}
	});
}

//================================================
// RECOVER
//================================================
function buscaPorMail(req,res){
	var email = req.params.email;
	User.findOne({email: email.toLowerCase()}, (err,user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			}else{
				user.password='Protegido';
				res.status(200).send({
					id:	user._id,
					user: user	
				});
			}
		}
	});
}
function buscaPorId(req,res){
	var id = req.params.id;
	User.findById(id, (err,user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			}else{
				user.password='Protegido';
				res.status(200).send({
					user: user	
				});
			}
		}
	});
}
//================================================
// MOSTRAR TODOS LOS USUARIOS PAGINADOS
//================================================
function usuariosPaginados(req,res){
	var desde = req.query.desde || 0;
	var items = req.query.items || 10;
	var orden = req.query.orden || 1; // 1: ascendente -1: descendente
	desde = Number(desde);
	items = Number(items);
	orden =Number(orden);

	User.find({},'name email image role')
	   .skip(desde)
	   .limit(items)
	   .sort([['name', orden]])	
	   .exec(
	   		(err, usuarios) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando usuarios'});
	   			}else{
	   				if(!usuarios){
						res.status(404).send({message: 'Imposible mostrar información'});
					}else{	
		   				User.countDocuments({}, (err,conteo) =>{
		   					res.status(200).send({
									users: usuarios,
									total: conteo
							});
		   				});
		   			}
	   				
	   			}
	   		}
	   	);
}
//================================================
// MOSTRAR TODOS LOS USUARIOS 
//================================================
function usuariosTodos(req,res){
	User.find({},'name email image role services')
	   .sort([['name', 1]])	
	   .exec(
	   		(err, usuarios) => {
	   			if (err){
	   				res.status(500).send({message: 'Error cargando usuarios'});
	   			}else{
	   				User.countDocuments({}, (err,conteo) =>{
	   					res.status(200).send({
								users: usuarios,
								total: conteo
						});
	   				});
	   				
	   			}
	   		}
	   	);
}


//================================================
// CREAR UN USUARIO
//================================================

function registraUsuario(req,res){
	var user = new User(req.body);
	var password = user.password;
	
	if(password){
		user.password = bcrypt.hashSync(password,10);
		if(user.name !=null  && user.email != null){
			user.save((err, userStored) => {
				if(err){
					res.status(500).send({
						error: err,
						message: 'Error al guardar el usuario'
					});
				}else{
					if(!userStored){
						res.status(404).send({message: 'No se ha registrado el usuario'});
					}else{
						res.status(200).send({
							user: userStored,
						});
					}
				}
			});
		}else{
			res.status(400).send({ message: 'Rellenar todos los campos'});
		}
	}else{
		res.status(400).send({ message: 'Introducir contraseña'});
	}
}


//================================================
// ACTUALIZAR CONTRASEÑA
//================================================

function updateUserPassword(req,res){
	var userId = req.params.id; // éste parámetro se pone en el url despues de /
	var params = req.body;      // éstos parámetros vienen del x-www-form-urlencoded
	if(params.password){
		// Encriptar contraseña 
		params.password = bcrypt.hashSync(params.password,10);

		User.findByIdAndUpdate(userId, params, { new: true }, (err, userUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
		if(err){
			res.status(500).send({message: 'Error al actualizar la contraseña'});
		}else{
			if(!userUpdated){
				res.status(404).send({message: 'No se ha podido cambiar la contraseña'});
			}else{
				userUpdated.password=':)'; //no está guardando este password es solo para no enviarlo
				res.status(200).send({user: userUpdated});
			}
		}
	});
	}

	
}

//================================================
// ACTUALIZAR UN USUARIO
//================================================

function updateUser(req,res){
	var userId = req.params.id; // éste parámetro se pone en el url despues de /
	var update = req.body;      // éstos parámetros vienen del x-www-form-urlencoded

	//  if(userId != req.user.sub){  // esto viene de la autorización por token
	// 	return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
	// }

	User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => { //el { new: true } es para que retorne el usuario con los datos actualisados no los datos anteriores antes de actualizarlo
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		}else{
			if(!userUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				userUpdated.password=':)'; //no está guardando este password es solo para no enviarlo
				res.status(200).send({
					user: userUpdated,
					token: jwt.createToken(userUpdated),
				});
			}
		}
	});
}

//================================================
// CARGAR IMAGEN
//================================================

function uploadImage(req,res){
	var userId =req.params.id;
	//var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_ext = path.extname(file_path);
		//var file_name = path.basename(file_path);

		//var nhj=req.files.image;
		var extensionesValidas = [ '.png', '.jpg', '.gif', '.jpeg', '.bmp'];

		//if(file_ext == '.png' || file_ext == '.jpg' || file_ext == '.gif'){
			if( extensionesValidas.indexOf(file_ext) >= 0 ){
			//personalizar Nombre
			var nombreArchivo = `${userId}-${ new Date().getMilliseconds() }${ file_ext }`;

			var path_destino = `./uploads/imgUser/${nombreArchivo}`;

			//Mover archivo
			fs.rename( file_path,path_destino, function(err){
					if (err){
						res.status(500).send({message: 'Error al mover archivo'});
					}else{
						//Actualizar nombre en base de datos
						User.findByIdAndUpdate(userId, {image: nombreArchivo}, (err, userUpdated) => {
 	
							if(!userUpdated){
								res.status(404).send({message: 'No se ha podido actualizar el usuario'});
						    }else{
						    	//Elimina imagen anterior
						    	var pathViejo = './uploads/imgUser/' + userUpdated.image;
						    	if( fs.existsSync(pathViejo)){
			    		            fs.unlink( pathViejo , err =>{
			    			          if(err) return console.log(err);
                                      console.log('file deleted successfully');
			    		            });
			    	}
						    	userUpdated.password=':)'; //esconder password
            				    res.status(200).send({ user: userUpdated, image: nombreArchivo });

						    }

						});
					}
			});


		}else{
			res.status(400).send({message: 'Extención del archivo no válida'});
		}
		
	}else{
		res.status(400).send({message: 'No has subido ninguna imagen...'});
	}
}

//================================================
// OBTENER IMAGEN
//================================================

function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	//var path_file = './uploads/users/'+imageFile;

	var path_file = path.resolve(__dirname, `../uploads/imgUser/${ imageFile }`);

	if( fs.existsSync( path_file ) ){
		res.sendFile(path_file);
	}else{
		var pathNoImage = path.resolve( __dirname, '../assets/no-img.jpg');
		res.sendFile(pathNoImage);
	}

}

//================================================
// ELIMINAR USUARIO
//================================================

function deleteUser(req,res){
	var userId = req.params.id; // éste parámetro se pone en el url despues de /
	User.findByIdAndRemove(userId, (err, userRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al borrar usuario'});
		}else{
			if(!userRemoved){
				res.status(404).send({message: 'No existe usuario con ese id'});
			}else{
				res.status(200).send({user: userRemoved});
			}
		}
	});
}

module.exports = {
	registraUsuario,
	login,
	usuariosPaginados,
	usuariosTodos,
	updateUser,
	uploadImage,
	getImageFile,
	deleteUser,
	renuevaToken,
	buscaPorMail,
	buscaPorId,
	updateUserPassword
};

// }