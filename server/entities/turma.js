import { Sequelize } from "sequelize";
import connection from "../connection/index.js";

const Turma = connection.define('turmas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        unique: true
    },
    descricao: {
        type: Sequelize.STRING
    }

});

export default Turma;