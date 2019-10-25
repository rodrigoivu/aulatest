'use strict';
var nodemailer = require('nodemailer');

exports.sendMail = function(req, res){
    var params = req.body;
    var id = params.id;
    var nombre = params.nombre;
    var email = params.email;
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        //service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'rodrigoivu@gmail.com',
            pass: 'rivu1313'
        }
    });
    // Definimos el email
    var mailOptions = {
        from: '"Desimat Service" <rodrigoivu@gmail.com>', // sender address
        to: email,
        subject: 'Cambio de Password',
        html: 
           `<style >
                img {
                max-width: 100%;
                }
                p{
                    margin-top: 0;
                    margin-bottom: 10px;
                    font-size: 16px;
                }
                p a{
                    text-decoration: none;
                }
                ul{
                    margin: 0 0 10px 0;
                    padding-left: 10px;;
                }
                @media (max-width: 480px) {
                    #logo {
                        margin: 0 auto;
                        padding-left: 0 !important;
                    }
                }
            </style>

            <div class="bodyclass">
                <div style="background-color: #f2f3f5; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto;">
                        <div style="background: #fff; font: 14px sans-serif; color: #686f7a; border-top: 4px solid #12096B; margin-bottom:20px;">
                            
                                <div style="border-bottom: 1px solid #f2f3f5; padding-bottom: 20px; padding-top: 20px;">
                                    <img id="logo" width="150" style="max-width: 150px; display: block; padding-left: 30px;" src="http://www.desimat.cl/assets/tienda/images/logo-header.png" alt="logo Desimat">
                                </div>
                                                        
                                <div style="padding: 30px 20px; line-height: 1.5em; color:#686f7a;">
                                    <p style="color:#737373;">Hola, ${nombre}</p>
                                    <p style="border-bottom: 1px solid #f2f3f5; padding-bottom: 20px; margin-bottom: 20px; color:#686f7a;">
                                        Desde el servicio D-cloud de Ingeniería Desimat, hemos recibido una solicitud de restablecimiento de contraseña de tu cuenta.
                                    </p>
                                    <p style="border-bottom: 1px solid #f2f3f5; padding-bottom: 20px; margin-bottom: 20px; color:#686f7a;">
                                        Haz clic en el botón que aparece a continuación para cambiar tu contraseña.
                                    </p>
                                    <a href="http://165.227.26.150/authentication/password/${id}" style="display: inline-block; font-size: 15px; color: #ffffff; padding: 10px 15px; text-decoration: none; background-color: #12096B; border-radius: 3px;" target="_blank" title="Este enlace externo se abrirá en una nueva ventana">
                                        Cambia Tu Contraseña
                                    </a>
                                </div>

                        </div>
                        <div style="font: 11px sans-serif; color: #686f7a;">
                            <p style="font-size: 11px; color: #686f7a;">
                                    INGENIERIA DESIMAT LTDA. Puerto Vespucio 9670 Santiago, Chile. Fono: 5851200
                            </p>
                        </div>
                    </div>
                </div>
            </div> ` 
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(err, info){
        if (err){
            console.log(err);
            res.send(500, err);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};