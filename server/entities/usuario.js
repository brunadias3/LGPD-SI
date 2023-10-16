import { Sequelize } from "sequelize";
import connection from "../connection/index.js";
import Turma from './turma.js';

const Usuario = connection.define('usuarios', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'O campo Login deve conter @ e .com. '
            },
            notNull: {
                msg: 'O campo Login é obrigatório.'
            }
        }
    },
    tipo_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O campo Tipo Usuário é obrigatório.'
            }
        }
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            customValidation(value) {
                if (value.length < 8) {
                    throw new Error('A senha deve ter pelo menos 8 caracteres.');
                }
            }
        }
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'ativo',
        allowNull: false
    },
    
    turma_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Turma,
            key: 'id'
        },
        validate: {
            isInt: {
                msg: 'O campo Turma id deve ser um número inteiro.'
            }
        }
    }
    

})

export default Usuario;