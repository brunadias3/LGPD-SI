import Turma from "../entities/turma.js";
import Usuario from "../entities/usuario.js";
import CryptoJS from "crypto-js"

class UsuarioController {
    async create(req, res) {
        try {
            const usuario = await Usuario.create({
                login: req.body.login,
                tipo_usuario: req.body.tipo_usuario,
                senha: req.body.senha,
                turma_id: req.body.turma_id
            });
            const chave = process.env.CHAVE;

            const idCrip = usuario.id.toString();
            const textCrip = CryptoJS.AES.encrypt(idCrip, chave).toString();
            const valorSeguroParaURL = encodeURIComponent(textCrip);

            // res.json(valorSeguroParaURL)

            const conteudoEmail = {
                service_id: `${process.env.SERVICE_ID}`,
                template_id: `${process.env.TEMPLATE_ID}`,
                user_id: `${process.env.PUBLIC_KEY}`,
                template_params: {
                    email: req.body.login,
                    link: `http://localhost:3000/profile/create/${valorSeguroParaURL}`
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


    async list(req, res) {
        try {
            const usuarios = await Usuario.findAll({
                include: {
                    model: Turma,
                    attributes: ['nome'],
                },
            });
            res.json(usuarios);

        } catch (error) {
            res.json({ error: error });
        }
    }

    async update(req, res) {
        try {
            await Usuario.update(
                {
                    login: req.body.login,
                    tipo_usuario: req.body.tipo_usuario,
                    senha: req.body.senha,
                    turma_id: req.body.turma_id
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );
            res.json({ message: "Os Dados Foram Atualizados com Sucesso." });

        } catch (error) {
            console.log(error);
            res.json({ error: error });
        }
    }

    async status(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.params.id);

            if (!usuario) {
                return res.json({ message: "Usuário não encontrado" });
            }

            usuario.status = req.body.status;
            await usuario.save();

            res.json({ message: "Usuário desativado" });


        } catch (error) {
            res.json({ error: error });
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