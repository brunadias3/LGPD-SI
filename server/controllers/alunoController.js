import Aluno from "../entities/aluno.js";
import Responsavel from "../entities/responsavel.js";
import Usuario from "../entities/usuario.js";

class AlunoController {
    async create(req, res) {
        const responsavel = await Responsavel.findOne({ where: { usuario_id: req.body.id } }).catch((e) => {
            return { error: "Responsável não encontrado Identificador inválido" }
        })
        console.log(responsavel)
        try {
            const aluno = await Aluno.create({
                cpf: req.body.cpf,
                rg: req.body.rg,
                data_nac: req.body.data_nac,
                nome: req.body.nome,
                responsavel_id: responsavel.dataValues.id
                
            });

            res.json(aluno);

        } catch (error) {
            console.log(error)
            res.json({ error: error });
        }
    }


    async list(req, res) {
        console.log(req.params)
        try {
            const responsavel = await Responsavel.findOne({ where: { usuario_id: req.params.id } }).catch((e) => 
                 { error: "Responsável não encontrado Identificador inválido" }
            )
            console.log("que caralhoooooooo", responsavel.id)
            const usuario = await Usuario.findOne({where:{id: responsavel.usuario_id}}).catch((e) => 
               
              { error: "Usuário não encontrado Identificador inválido" }
            )
           
            if(usuario.tipo_usuario == 1){
                const aluno = await Aluno.findAll({where:{responsavel_id:responsavel.id}})
             
               return res.json(aluno)

            }else{
                const aluno = await Aluno.findAll()
                return res.json(aluno)

            }

        } catch (error) {
            console.log("error", error )
            return res.json({ error: error })
        }
    }

    async listOne(req, res){
        const id = parseInt(req.params.id)
        const aluno = await Aluno.findOne({ where: { id: id } }).catch((e) => {
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