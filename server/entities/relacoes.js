import Turma from './turma.js';
import Perfil from './perfil.js';
import Usuario from "./usuario.js";

Turma.hasMany(Perfil, { foreignKey: 'turma_id' });
Perfil.belongsTo(Turma, { foreignKey: 'turma_id' });
Perfil.belongsTo(Usuario, { foreignKey: 'usuario_id' }); 