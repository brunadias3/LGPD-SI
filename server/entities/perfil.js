import { Sequelize } from "sequelize";
import connection from "../connection/index.js";
import Usuario from "./usuario.js";


const Perfil = connection.define('perfils', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cpf: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O campo CPF é obrigatório.'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'O campo Email deve conter @ e .com. '
            },
            notNull: {
                msg: 'O campo Email não pode é obrigatório.'
            }
        }
    },
    rg: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O campo RG é obrigatório.'
            }
        }
    },
    data_nac: {
        type: Sequelize.DATE,
        allowNull: false,
        isDate: true,
        validate: {
            notNull: {
                msg: 'O campo Data de Nacimento é obrigatório.'
            }
        }
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O campo Nome é obrigatório.'
            }
        }
    },

    cpf_res: {
        type: Sequelize.STRING
    },
    email_res: {
        type: Sequelize.STRING
    },
    rg_res: {
        type: Sequelize.STRING
    },
    data_nac_res: {
        type: Sequelize.DATE
    },
    nome_res: {
        type: Sequelize.STRING
    },

    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
    },{
    validate: {
        validacaIdade() {
            if (this.data_nac) {
                const hoje = new Date();
                const idade = hoje.getFullYear() - this.data_nac.getFullYear();

                if (idade < 18) {
                    if (!this.cpf_res || !this.email_res || !this.rg_res || !this.data_nac_res || !this.nome_res) {
                        throw new Error('Os Campos do responsavel são obrigatórios.');
                    }
                }
            }
        }
    }
});


export default Perfil;