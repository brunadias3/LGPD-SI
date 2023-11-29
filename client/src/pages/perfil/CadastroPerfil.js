import Header from "../../components/Header";
import Campo from "../../components/Campo";
import { useEffect, useState } from "react";
import CheckBoxTermo from "../../components/checkbox";
import { useParams, useNavigate } from "react-router-dom";
import CheckBoxEmail from "../../components/CheckEmail";
import cookies from "js-cookies";

function CadastrarPerfil() {

    const {cp} =  useParams();
    const [senhaUsu, setSenhaUsu] = useState("")
    const [dataNascUsu, setDataNascUsu] = useState("")
    const [cpfResponsalve, setCpfResponsavel] = useState('')
    const [emailResponsavel, setEmailResponsavel] = useState('')
    const [rgResponsavel, setRgResponsavel] = useState('')
    const [nomeResponsavel, setNomeResponsavel] = useState('')
    const [statusTermos, setStatusTermos] = useState(false) 
    const [statusPrivilegios, setStatusPrivilegios] = useState(false) 
    const [statusEmail, setStatusEmail] = useState(false) 

    const [usarSenhas, setUsarSenhas] = useState(false) 

    const navigate = useNavigate()
    const google = (e) => {
        e.preventDefault()
        window.open("http://localhost:3000/auth/google", "_blank", "width=500,height=600");
      };

    function CadastrarUsu() {
        console.log(cp)
        console.log(statusEmail)


        let url = 'http://localhost:3000/responsible/create/'
      
       
        fetch(url, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                cpf: cpfResponsalve,
                email: emailResponsavel,
                rg: rgResponsavel,
                data_nac: dataNascUsu,
                nome: nomeResponsavel,
                senha:senhaUsu,
                cp:cp,
                usaSenha:usarSenhas,
                statusTermos: statusTermos,
                statusPrivilegios: statusPrivilegios,
                statusEmail: statusEmail,
            })
            
        }).then((resp) => resp.json()).then((data) => {
            console.log("data",data)

            if (data.error) {
                alert("ERRO:"+ data.error)
            } else {
                alert("SUCESSO!")
                navigate('/')

            }

        })

    }
    useEffect(()=>{

        setInterval(() => {
            console.log("1",cookies.getItem("token"))
            
        }, 1);
        
    },[10])


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">

            <Header title={"Perfil responsável"} />

            <Campo text={"Nome"} id={"nomeResp"} placeholder={"Digite o nome"} type={"text"} value={nomeResponsavel} setValue={setNomeResponsavel} />
            <Campo text={"RG"} id={"rgResp"} placeholder={"Digite o RG"} type={"number"} value={rgResponsavel} setValue={setRgResponsavel} />
            <Campo text={"CPF"} id={"cpfResp"} placeholder={"Digite o CPF"} type={"number"} value={cpfResponsalve} setValue={setCpfResponsavel} />
            <Campo text={"Data de nascimento"} id={"dataNasc"} type={"date"} value={dataNascUsu} setValue={setDataNascUsu} />
            <Campo text={"E-mail para contato"} id={"emailResp"} placeholder={"Digite o e-mail"} type={"email"} value={emailResponsavel} setValue={setEmailResponsavel} />
            <div className="flex items-center">
                <input
                    value ={usarSenhas}
                    onChange={()=> setUsarSenhas(!usarSenhas)}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900">
                    Usar Senha
                </label>

            
            </div>
            
            {usarSenhas? <Campo text={"Digite sua senha"} id={"senhaUsu"} placeholder={"Digite novamente a senha"} type={"password"} value={senhaUsu} setValue={setSenhaUsu} />:
 <a href="" onClick={(e)=> google(e)}>Login com google</a>
            }
          
            
            <CheckBoxTermo redirecionamento={"http://localhost:8080/TERMOS.pdf"} textoTermo={"Termos e Condições de Uso"} onChange={() => setStatusTermos(!statusTermos)}/>
            
            <CheckBoxTermo redirecionamento={"http://localhost:8080/politica.pdf"} textoTermo={"Política de privacidade"} onChange={() => setStatusPrivilegios(!statusPrivilegios)}/>
            <CheckBoxEmail onChange={() => setStatusEmail(!statusEmail)} />
            

            <div className="mt-5 mb-5 flex items-center justify-center" >
                <button
                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                    onClick={CadastrarUsu}
                >
                    Finalizar o cadastro
                </button>
            </div>

        </div>
    )
}

export default CadastrarPerfil