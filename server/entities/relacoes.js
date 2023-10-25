import Aluno from "./aluno.js";
import Responsavel from "./responsavel.js";
import Turma from "./turma.js";
import Usuario from "./usuario.js";


Aluno.belongsTo(Turma, { foreignKey: 'turma_id' });
Turma.hasMany(Aluno, { foreignKey: 'turma_id' });

Responsavel.hasMany(Aluno, { foreignKey: 'responsavel_id' });
Aluno.belongsTo(Responsavel, { foreignKey: 'responsavel_id' });

Responsavel.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasOne(Responsavel, { foreignKey: 'usuario_id' });


export { Aluno, Responsavel, Turma, Usuario };