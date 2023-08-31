import Usuario from "../entities/usuario.js";

class UsuarioController {
    async create(req, res) {
        try {
            const usuario = await Usuario.create({
                login: req.body.login,
                token: req.body.token
            });
            res.status(201).json(usuario);

        } catch (error) {
            res.status(500).json({ message: "Usuario nao foi cadastrado" });
        }
    }

    async list(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.status(200).json(usuarios);

        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async update(req, res) {
        try {
            await Usuario.update(
                {
                    login: req.body.login,
                    token: req.body.token
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );
            res.status(200).json("Os Dados Foram Atualizados com Sucesso.");

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    }

    async delete(req, res) {
        try {
            await Usuario.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ message: 'Usuario Removido' });

        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default new UsuarioController();