import Turma from "../entities/turma.js";

class TurmaController {
    async create(req, res) {
        try {
            await Turma.create({
                nome: req.body.nome,
                descricao: req.body.descricao
            });
            res.status(201).json({message:"Turma cadastrada"});

        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async list(req, res) {
        try {
            const turmas = await Turma.findAll();
            res.status(200).json(turmas);

        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async getTurma(req, res){
        const id = parseInt(req.params.id)
        const turma = await Turma.findOne({ where: { id: id } }).catch((e) => {
            return { error: "Identificador inválido" }
        })
        return res.json(turma);
    }

    async update(req, res) {
        try {
            await Turma.update(
                {
                    nome: req.body.nome,
                    descricao: req.body.descricao
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );
            res.status(200).json({ message:"Os Dados Foram Atualizados com Sucesso."});

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }

    async delete(req, res) {
        try {
            await Turma.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({ message: "Turma Removida" });

        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default new TurmaController();