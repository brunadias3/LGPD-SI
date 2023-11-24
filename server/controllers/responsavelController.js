import Responsavel from "../entities/responsavel.js";
import CryptoJS from "crypto-js"
import LogTermos from "../entities/logTermos.js";
import { Sequelize } from "sequelize";


class ResponsavelController {
    async create(req, res) {
        try {

            const obri = ['statusTermos', 'statusPrivilegios', 'statusEmail'];

            for (const tem of obri) {
                if (!req.body[tem]) {
                    return res.json({ error: `${tem} é obrigatório na body.` });
                }
            }

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

            if (req.body.statusTermos) {
                await LogTermos.create({ 
                    responsavel_id: responsavel.id, 
                    termo: 'Termos', 
                    status: req.body.statusTermos });
            }

            if (req.body.statusPrivilegios) {
                await LogTermos.create({ 
                    responsavel_id: responsavel.id, 
                    termo: 'Privilegios', 
                    status: req.body.statusPrivilegios });
            }

            if (req.body.statusEmail) {
                await LogTermos.create({ 
                    responsavel_id: responsavel.id, 
                    termo: 'Permissão Email', 
                    status: req.body.statusEmail });
            }

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

    async listOne(req, res) {
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


            if (req.body.statusTermos) {
                await LogTermos.create({ responsavel_id: 
                    req.params.id, 
                    termo: 'Termos', 
                    status: req.body.statusTermos });
            }

            if (req.body.statusPrivilegios) {
                await LogTermos.create({ 
                    responsavel_id: req.params.id, 
                    termo: 'Privilegios', 
                    status: req.body.statusPrivilegios });
            }

            if (req.body.statusEmail) {
                await LogTermos.create({ 
                    responsavel_id: req.params.id, 
                    termo: 'Permissão Email', 
                    status: req.body.statusEmail });
            }

            res.json({ message: "Os Dados Foram Atualizados com Sucesso." })

        } catch (error) {
            res.json({ error: error })
        }
    }

    async getLog(req, res) {
        try {
            const logs = await LogTermos.findAll({
                attributes: {
                    exclude: ['updatedAt'],
                    include: [
                        [
                            Sequelize.fn(
                                'date_format',
                                Sequelize.fn('convert_tz', Sequelize.col('createdAt'), '+00:00', '-03:00'),
                                '%d/%m/%Y %H:%i:%s'
                            ),
                            'formattedCreatedAt'
                        ]
                    ]
                },
                where: {
                    responsavel_id: req.params.id,
                    termo: { [Sequelize.Op.like]: `%${req.query.termo}%` }
                },
                order: [['createdAt', 'ASC']]
            });

            res.json(logs);


        } catch (error) {
            console.error(error)
        }
    }


} export default new ResponsavelController()