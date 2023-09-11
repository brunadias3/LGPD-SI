import Header from "../components/Header";
import Campo from "../components/Campo";
import { useState } from "react";

function CadastroUsuario() {

    const [emailLogin, setEmailLogin] = useState("")
    const [senha, setSenha] = useState("")

    function CadastrarUsu() {
        const emailLogin = document.getElementById("emailLogin");
        const senha = document.getElementById("senhaUsu");
        const tipoUsu = document.getElementById('tipoUsuario');

        let url =  'http://localhost:3000/user/create'

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ login: emailLogin.value, senha: senha.value, tipo_usuario: tipoUsu.value })
        }).then((resp) => resp.json()).then((data) => {
            if (data.error) {
                alert(data.error)
            } else {
                alert(data.message)
            }
        })
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">

            <Header title={"Cadastro de usuarios"} />
            <Campo text={"E-mail para login"} id={"emailLogin"} placeholder={"Digite o e-mail para efetuar o login"} type={"email"} value={emailLogin} setValue={setEmailLogin} />
            <Campo text={"Senha"} id={"senhaUsu"} placeholder={"Senha do usuário"} type={"password"} value={senha} setValue={setSenha} />
           
            <div className='mt-5 m-0.5'>
                <label className="text-lg font-bold dark:text-black " >Selecione o perfil do usuário</label>
                <select id="tipoUsuario" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="default" disabled>Selecione uma opção</option>
                    <option value='1' >Corpo docente</option>
                    <option value='2'>Aluno</option>
                    <option value='3'>Diretoria</option>
                </select>
            </div>

            <div className="mt-5 mb-5 flex items-center justify-center" >
                <button
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={CadastrarUsu}
                >
                    Cadastrar
                </button>
            </div>
            <div>
            </div>
        </div>
    )

}

export default CadastroUsuario;
