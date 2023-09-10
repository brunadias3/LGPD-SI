import Header from "../components/Header";
import Campo from "../components/Campo";
import { useState } from "react";

function CadastroUsuario() {


    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    function CadastrarUsu() {
        const email = document.getElementById("emailUsu");
        const senha = document.getElementById("senhaUsu");

        let url = 'http://localhost:/user/create

        fetch(url, {
            method: "POST",
            port: 3304,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ login: email.value, token: senha.value })
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
            <Campo text={"E-mail"} id={"emailUsu"} placeholder={"E-mail do usuário"} type={"text"} value={email} setValue={setEmail} />
            <Campo text={"Senha"} id={"senhaUsu"} placeholder={"Senha do usuário"} type={"password"} value={senha} setValue={setSenha} />

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