import { Sequelize } from "sequelize";
import connection from "../connection/index.js";
import Usuario from "./usuario.js";

const Responsavel = connection.define('responsavel', {
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
                msg: 'O campo Email é obrigatório.'
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
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        isDate: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        isDate: true
    },

    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Usuario,
            key: 'id'
        },
        validate: {
            isInt: {
                msg: 'O campo Responsavel id deve ser um número inteiro.'
            },
            notNull: {
                msg: 'O campo Usuario id é obrigatório.'
            }
        }
    }
});


export default Responsavel;