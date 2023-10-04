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
        unique: true

    },
    tipo_usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING
    },
    turma_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Turma,
            key: 'id'
        }
    }
    

})

export default Usuario;