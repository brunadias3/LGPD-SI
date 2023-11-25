import Responsavel from "../entities/responsavel.js";
import Usuario from "../entities/usuario.js";
import CryptoJS from "crypto-js"
import * as bcrypt from "bcrypt";

class ResponsavelController {
    async create(req, res) {
        try {

            console.log("kerelhoooooon")
            const chave = process.env.CHAVE;
            const texCif = decodeURIComponent(req.body.cp);
            const texDes = CryptoJS.AES.decrypt(texCif, chave);
            const IdDes = texDes.toString(CryptoJS.enc.Utf8);
            
    
            console.log("aaaaaaaaaaaa",IdDes)

            const responsavel = await Responsavel.create({

                id:0,
                cpf: req.body.cpf,
                email: req.body.email,
                rg: req.body.rg,
                data_nac: req.body.data_nac,
                nome: req.body.nome,
                log_termos: req.body.log_termos,
                log_privacidade: req.body.log_privacidade,
                usuario_id: IdDes,
                
                
                
            });
            if(req.body.usaSenha){
                var newPass = await bcrypt.hash(req.body.senha, 10)
                await Usuario.update(
                    {
                        senha: newPass
                    },
                    {
                        where: {
                            id: IdDes
                        }
                    })

            }else{
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                console.log(req.user)
                await Usuario.update(
                    {
                        google_id : req.user.id
                    },
                    {
                        where: {
                            id: IdDes
                        }
                    })
            }
          

            res.json(responsavel);

        } catch (error) {
            console.log(error)
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
        const responsavel = await Responsavel.findOne({ where: { usuario_id: id } }).catch((e) => {
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
            },
                {
                    where: {
                        usuario_id: req.params.id
                    }
                })

             if(req.body.senha){
                await Usuario.update({
                    senha:await bcrypt.hash(req.body.senha, 10)
                }, {
                    where:{

                        id:req.params.id
                }})
             }   
            res.json({ message: "Os Dados Foram Atualizados com Sucesso." })

        } catch (error) {
            res.json({ error: error })
        }
    }

 
} export default new ResponsavelController()