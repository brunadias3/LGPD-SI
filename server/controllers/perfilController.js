import Perfil from "../entities/perfil.js";

class PerfilController {
    async create(req, res) {
        try {
            const perfil = await Perfil.create({
                cpf: req.body.cpf,
                email: req.body.email,
                rg: req.body.rg,
                data: req.body.data,
                nome: req.body.nome,
                tipo_usuario: req.body.tipo_usuario,
                usuario_id: req.body.usuario_id
            })
            res.status(201).json(perfil)

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    async list(req, res) {
        try {
            const perfis = await Perfil.findAll()
            res.status(201).json(perfis)

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    async update(req, res) {
        try {
            await Perfil.update({
                cpf: req.body.cpf,
                email: req.body.email,
                rg: req.body.rg,
                data: req.body.data,
                nome: req.body.nome,
                tipo_usuario: req.body.tipo_usuario,
                usuario_id: req.body.usuario_id
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
            res.status(201).json("Os Dados Foram Atualizados com Sucesso.")

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }
    }

    async delete(req, res) {
        try {
            await Perfil.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(201).json({ message: 'Perfil Removido' })

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

} export default new PerfilController()