import Aluno from "../entities/aluno.js";

class AlunoController {
    async create(req, res) {
        try {
            const aluno = await Aluno.create({
                cpf: req.body.cpf,
                rg: req.body.rg,
                data_nac: req.body.data_nac,
                nome: req.body.nome,
                responsavel_id: req.body.responsavel_id
                
            });

            res.json(aluno);

        } catch (error) {
            res.json({ error: error });
        }
    }


    async list(req, res) {
        try {
            const aluno = await Aluno.findAll()
            res.json(aluno)

        } catch (error) {
            res.json({ error: error })
        }
    }

    async listOne(req, res){
        const id = parseInt(req.params.id)
        const aluno = await aluno.findOne({ where: { id: id } }).catch((e) => {
            return { error: "Identificador inválido" }
        })
        return res.json(aluno);
    }

    

    async update(req, res) {
        try {
            await Aluno.update({
                cpf: req.body.cpf,
                rg: req.body.rg,
                data_nac: req.body.data_nac,
                nome: req.body.nome,
                responsavel_id: req.body.responsavel_id
            },
                {
                    where: {
                        id: req.params.id
                    }
                })
            res.json({ message: "Os Dados Foram Atualizados com Sucesso." })

        } catch (error) {
            res.json({ error: error })
        }
    }

    async status(req, res) {
        try {
            const aluno = await Aluno.findByPk(req.params.id);

            if (!aluno) {
                return res.json({ message: "Aluno não encontrado" });
            }

            aluno.status = req.body.status;
            aluno.turma_id = req.body.turma_id;
            await aluno.save();

            res.json(aluno);


        } catch (error) {
            res.json({ error: error });
        }
    }


} export default new AlunoController()