import Usuario from "../entities/usuario.js";
import * as bcrypt from "bcrypt";
import {generateToken} from '../middlewares/index.js'

class LoginController {

    async login(req, res) {
        const { email, senha } = req.body;
        console.log("aaaa", email, senha)
        try {
            const user = await Usuario.findOne({ where: { login: email } })
            console.log("aaaaaaa", user.dataValues)

            if (!user) {
                return res.status(401).json({ error: "Usuário não encontrado" });
            }

            // Comparar a senha fornecida com a senha armazenada no banco de dados
            const isPasswordValid = await bcrypt.compare(senha, user.dataValues.senha);

            if (isPasswordValid) {
                // Se a senha estiver correta, gerar um JWT e enviá-lo na resposta
                // const token = await generateToken({ email });
                // res.cookie("jwt", token);
                return res.json({ success: true, user: user});
            } else {
                // Se a senha estiver incorreta, retornar uma mensagem de erro
                return res.status(401).json({ error: "Senha Incorreta" });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Erro ao buscar usuário" });
        }
    }

    async checkAuthentication(req, res){
        try {
            let token = req.header("Authorization");

            if (!token) {
                // Se o token não estiver no header, verifique no cookie
                token = req.cookies.jwt;
            }

            if (!token) {
                return res.status(401).json({ error: "Token não fornecido" });
            }

            // Verifique o token JWT usando a função de autorização
            authorization(req, res, (err) => {
                if (err) {
                    return res.status(401).json({ error: "Token inválido" });
                }
                return res.json({ success: true, user: res.locals });
            });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao verificar autenticação" });
        }
    }

    async logOut(req, res){
        res.clearCookie("jwt");
        return res.json({ success: true });
    }

}

export default new LoginController();
