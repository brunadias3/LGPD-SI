import { Sequelize } from "sequelize";
import connection from "../connection/index.js";
import Usuario from "./usuario.js";
import Turma from './turma.js';

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
    data_nac: {
        type: Sequelize.DATE,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
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
        references: {
            model: Usuario,  
            key: 'id'       
        }
    },
    turma_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Turma,  
            key: 'id'       
        }
    }
})

export default Perfil;