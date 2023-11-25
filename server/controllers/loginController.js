import Usuario from "../entities/usuario.js";
import * as bcrypt from "bcrypt";
import {generateToken} from '../middlewares/index.js'
import axios from 'axios'
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
                const token = await generateToken({ email });
                console.log(token)
                res.cookie("jwt", token);
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
         
            if(req.user && req.user.id){
             
                const user = await Usuario.findOne({ where: { google_id: req.user.id } })
                return res.json({ success: true, user: user});
            }else{
                return res.json({error:true})
            }
        } catch (error) {
            return res.status(500).json({ error: "Erro ao verificar autenticação" });
        }
    }

    async logOut(req, res){
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(req.cookies)
        if(req.user){
            let url = "https://oauth2.googleapis.com/revoke?token="+req.cookies.token
            console.log(url)
            try{
                await axios.post(url,{},{
                    
                        headers: {'Content-type': "application/x-www-form-urlencoded"}
                    }).then((data)=>{
                        

                    })
                }catch(e){
                    console.log(e)
                }
                    req.logOut()
                    res.cookie("session", null)
                    res.cookie('token', null)
                    return res.json({ success: true });

            }else{
                res.cookie("jwt", null);
                    return res.json({ success: true });

            }

        
    }

}

export default new LoginController();
