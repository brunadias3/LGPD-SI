import Perfil from "../entities/perfil.js";

class PerfilController {
    async create(req, res) {
        try {
            const perfil = await Perfil.create({
                cpf: req.body.cpf,
                email: req.body.email,
                rg: req.body.rg,
                data_nac: req.body.data_nac,
                nome: req.body.nome,


                cpf_res: req.body.cpf_res,
                email_res: req.body.email_res,
                rg_res: req.body.rg_res,
                data_nac_res: req.body.data_nac_res,
                nome_res: req.body.nome_res,

                usuario_id: req.body.usuario_id,
                turma_id: req.body.turma_id
            })
            res.status(201).json(perfil)

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    async list(req, res) {
        try {
            const perfis = await Perfil.findAll()
            res.status(201).json(perfis)

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    async update(req, res) {
        try {
            await Perfil.update({
                cpf: req.body.cpf,
                email: req.body.email,
                rg: req.body.rg,
                data_nac: req.body.data_nac,
                nome: req.body.nome,


                cpf_res: req.body.cpf_res,
                email_res: req.body.email_res,
                rg_res: req.body.rg_res,
                data_nac_res: req.body.data_nac_res,
                nome_res: req.body.nome_res,

                usuario_id: req.body.usuario_id,
                turma_id: req.body.turma_id
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
            res.status(201).json({ message:"Os Dados Foram Atualizados com Sucesso."})

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error })
        }
    }

    async delete(req, res) {
        try {
            await Perfil.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(201).json({ message: "Perfil Removido" })

        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

} export default new PerfilController()