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
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rg: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE
    },
    nome: {
        type: Sequelize.STRING
    },
    tipo_usuario: {
        type: Sequelize.INTEGER
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Usuario,  
            key: 'id'       
        }
    }

})
Perfil.belongsTo(Usuario, { foreignKey: 'usuario_id' })


export default Perfil;