import { Sequelize } from "sequelize";
import connection from "../connection/index.js";

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
    }

})

export default Usuario;