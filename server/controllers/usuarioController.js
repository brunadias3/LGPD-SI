import Usuario from "../entities/usuario.js";
import CryptoJS from "crypto-js"

function getPassword() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$";
    var passwordLength = 8;
    var password = "";

    for (var i = 0; i < passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }

class UsuarioController {

    async create(req, res) {
        try {
            const senhaAleatoria = getPassword();

            const usuario = await Usuario.create({

                login: req.body.login,
                tipo_usuario: req.body.tipo_usuario,
                senha: senhaAleatoria
            });

            const chave = process.env.CHAVE;
            const idCrip = usuario.id.toString();
            const textCrip = CryptoJS.AES.encrypt(idCrip, chave).toString();
            const valorSeguroParaURL = encodeURIComponent(textCrip);

            const conteudoEmail = {
                service_id: `${process.env.SERVICE_ID}`,
                template_id: `${process.env.TEMPLATE_ID}`,
                user_id: `${process.env.PUBLIC_KEY}`,
                template_params: {
                    email: req.body.login,
                    link: `http://localhost:3000/responsible/create/${valorSeguroParaURL}`,
                    senha: senhaAleatoria
                }
            };

            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(conteudoEmail)
            });

            if (response.ok) {
                console.log('SUCCESS!', response.status, response.statusText);
                return res.json({ message: 'Código de autenticação enviado com sucesso.' });
            } else {
                console.log('FAILED...', response.status, response.statusText);
                return res.status(response.status).json({ error: 'Erro ao enviar o Código de autenticação ' });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async update(req, res) {
        try {
            await Usuario.update(
                {
                    login: req.body.login,
                    tipo_usuario: req.body.tipo_usuario,
                    senha: req.body.senha
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );

            res.json({ message: "Os Dados Foram Atualizados com Sucesso." });

            res.status(200).json({ message: "Os Dados Foram Atualizados com Sucesso." });

        } catch (error) {
            res.json({ error: error });
        }
    }
    
    async list(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message }); 
        }
    }


    //     async delete(req, res) {
    //         try {
    //             await Usuario.destroy({
    //                 where: {
    //                     id: req.params.id
    //                 }
    //             });
    //             res.status(200).json({ message: "Usuario Removido" });

    //         } catch (error) {
    //             res.status(500).json({ error: error });
    //         }
    //     }

 

}

export default new UsuarioController();