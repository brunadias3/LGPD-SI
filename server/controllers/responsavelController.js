import Responsavel from "../entities/responsavel.js";
import CryptoJS from "crypto-js"

class ResponsavelController {
    async create(req, res) {
        try {

            const chave = process.env.CHAVE;
            const texCif = decodeURIComponent(req.params.cp);
            const texDes = CryptoJS.AES.decrypt(texCif, chave);
            const IdDes = texDes.toString(CryptoJS.enc.Utf8);

            const responsavel = await Responsavel.create({
                cpf: req.body.cpf,
                email: req.body.email,
                rg: req.body.rg,
                data_nac: req.body.data_nac,
                nome: req.body.nome,
                usuario_id: IdDes
                
            });

            res.json(responsavel);

        } catch (error) {
            res.json({ error: error });
        }
    }


    async list(req, res) {
        try {
            const responsavel = await Responsavel.findAll()
            res.json(responsavel)

        } catch (error) {
            res.json({ error: error })
        }
    }

    async listOne(req, res){
        const id = parseInt(req.params.id)
        const responsavel = await responsavel.findOne({ where: { id: id } }).catch((e) => {
            return { error: "Identificador inválido" }
        })
        return res.json(responsavel);
    }

    async update(req, res) {
        try {
            await Responsavel.update({
                cpf: req.body.cpf,
                email: req.body.email,
                rg: req.body.rg,
                data_nac: req.body.data_nac,
                nome: req.body.nome,
                usuario_id: req.body.usuario_id
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

 
} export default new ResponsavelController()