import { Sequelize } from "sequelize";
import connection from "../connection/index.js";
import Responsavel from "./responsavel.js";

const LogTermos = connection.define('log_termos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    responsavel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Responsavel,
            key: 'id'
        }
    },
    termo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O campo Termo é obrigatório.'
            }
        }
    },
    status: {
        type: Sequelize.ENUM('true', 'false'),
        allowNull: false,
        defaultValue: 'true',
        validate: {
            isIn: {
                args: [['true', 'false']],
                msg: 'O campo Status deve ser "true" ou "false".'
            }
        }
    },

    createdAt: {
        type: Sequelize.DATE,
        allowNull: false

    }

});

export default LogTermos;