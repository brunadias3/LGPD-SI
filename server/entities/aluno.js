import { Sequelize } from "sequelize";
import connection from "../connection/index.js";
import Responsavel from "./responsavel.js";
import Turma from './turma.js';

const Aluno = connection.define('aluno', {
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
    status: {
        type: Sequelize.STRING,
        defaultValue: 'ativo',
        allowNull: false
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
    },
    responsavel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Responsavel,
            key: 'id'
        },
        validate: {
            isInt: {
                msg: 'O campo Responsavel id deve ser um número inteiro.'
            },
            notNull: {
                msg: 'O campo Responsavel id é obrigatório.'
            }
        }
    }


});


export default Aluno;