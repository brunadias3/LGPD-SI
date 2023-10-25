import { Sequelize } from 'sequelize';
import connection from '../connection/index.js';
import bcrypt from 'bcrypt';

const Usuario = connection.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'O campo Login deve conter @ e .com. ',
            },
            notNull: {
                msg: 'O campo Login é obrigatório.',
            },
        },
    },
    tipo_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O campo Tipo Usuário é obrigatório.',
            },
        },
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, Infinity],
                msg: 'A senha deve ter pelo menos 8 caracteres.',
            },
        },
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
    }
}, {
    hooks: {
        beforeCreate: async (usuario) => {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(usuario.senha, saltRounds);
            usuario.senha = hashedPassword;
        },
    },
});

export default Usuario;
