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
    token: {
        type: Sequelize.STRING
    }

})

export default Usuario;