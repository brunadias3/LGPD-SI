import Header from "../components/Header";
import Campo from "../components/Campo";
import { useState } from "react";

function CadastrarPerfil() {
    const [emailUsu, setEmailUsu] = useState("")
    const [senhaUsu, setSenhaUsu] = useState("")
    const [senhaUsuConfirma, setSenhaUsuConfirma] = useState("")
    const [dataNascUsu, setDataNascUsu] = useState("")
    const [nomeUsu, setNomeUsu] = useState("")
    const [rgUsu, setRgUsu] = useState("")
    const [cpfUsu, setCpfUsu] = useState("")
    function CadastrarUsu() {
        console.log('socoro');
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">

            <Header title={"Finalizar Cadastro"} />
            <Campo text={"Nome"} id={"nomePefil"} placeholder={"Digite o nome"} type={"text"} value={nomeUsu} setValue={setNomeUsu} />
            <Campo text={"RG"} id={"rg"} placeholder={"Digite o RG"} type={"number"} value={rgUsu} setValue={setRgUsu} />
            <Campo text={"CPF"} id={"cpf"} placeholder={"Digite o CPF"} type={"number"} value={cpfUsu} setValue={setCpfUsu} />
            <Campo text={"E-mail institucional"} id={"emailInst"} placeholder={"Digite o e-mail"} type={"email"} value={emailUsu} setValue={setEmailUsu} />
            <Campo text={"Data de nascimento"} id={"dataNasc"} type={"date"} value={dataNascUsu} setValue={setDataNascUsu} />
            <Campo text={"Atualize a senha"} id={"senhaUsu"} placeholder={"Senha do usuário"} type={"password"} value={senhaUsu} setValue={setSenhaUsu} />
            <Campo text={"Confirme a senha"} id={"senhaUsuConfirma"} placeholder={"Digite novamente a senha"} type={"password"} value={senhaUsuConfirma} setValue={setSenhaUsuConfirma} />
            <div className="mt-5 mb-5 flex items-center justify-center" >
                <button
                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                    onClick={CadastrarUsu}
                >
                    Finalizar o cadastro
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}

export default CadastrarPerfil