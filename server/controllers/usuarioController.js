import Usuario from "../entities/usuario.js";

class UsuarioController {
    async create(req, res) {
        try {
             await Usuario.create({
                login: req.body.login,
                tipo_usuario: req.body.tipo_usuario,
                senha: req.body.senha,
                turma_id: req.body.turma_id
            });
            res.status(201).json({message:"Usuario cadastrado"});

        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async list(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.status(200).json(usuarios);

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
                    senha: req.body.senha,
                    turma_id: req.body.turma_id
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );
            res.status(200).json({message: "Os Dados Foram Atualizados com Sucesso."});

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async delete(req, res) {
        try {
            await Usuario.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ message: "Usuario Removido" });

        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default new UsuarioController();