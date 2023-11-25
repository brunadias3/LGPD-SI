import jwt from "node-jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config()

// cria um token usando os dados do objeto e a chave armazenada na variável de ambiente JWT_SECRET
export const generateToken = async function (obj) {
   
    
    return jwt.sign(obj, process.env.JWT_SECRET )};


export const authorization = (req,res, next) => {
        // o token precisa ser enviado pelo cliente no header da requisição
        
   
        try {
            if(req.user){
                next()
            }else{
                 // valida o token
                
              
                const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
                if( !decoded ){
                    console.log(decoded)
                    res.status(401).json({error:"Não autorizado"});
                }else{
                    next()
                }
            }
            
           
        } catch (error) {
            // o toke não é válido, a resposta com HTTP Method 401 (unauthorized)
            return res.status(401).send({error:"Não autorizado"});
        }
      
        
    };

