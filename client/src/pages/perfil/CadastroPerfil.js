import Header from "../../components/Header";
import Campo from "../../components/Campo";
import { useState, useEffect } from "react";
import CheckBoxTermo from "../../components/checkbox";

function CadastrarPerfil() {

    const [senhaUsu, setSenhaUsu] = useState("")
    const [dataNascUsu, setDataNascUsu] = useState("")
    const [cpfResponsalve, setCpfResponsavel] = useState('')
    const [emailResponsavel, setEmailResponsavel] = useState('')
    const [rgResponsavel, setRgResponsavel] = useState('')
    const [nomeResponsavel, setNomeResponsavel] = useState('')




    function CadastrarUsu() {


        const dataNasc = document.getElementById('dataNasc');
        const emailResp = document.getElementById("emailResp");
        const nomeResp = document.getElementById("nomeResp");
        const rgResp = document.getElementById("rgResp");
        const cpfResp = document.getElementById("cpfResp");


        let url = 'http://localhost:3000/responsible/create'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                cpf: cpfResp.value,
                emailResp: emailResp.value,
                rg: rgResp.value,
                data_nac: dataNasc.value,
                nome: nomeResp.value

            })
        }).then((resp) => resp.json()).then((data) => {

            if (data.error) {
                alert("Fudeu")
            } else {
                alert("Foi")
            }

        })

    }




    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">

            <Header title={"Perfil responsável"} />

            <Campo text={"Nome"} id={"nomeResp"} placeholder={"Digite o nome"} type={"text"} value={nomeResponsavel} setValue={setNomeResponsavel} />
            <Campo text={"RG"} id={"rgResp"} placeholder={"Digite o RG"} type={"number"} value={rgResponsavel} setValue={setRgResponsavel} />
            <Campo text={"CPF"} id={"cpfResp"} placeholder={"Digite o CPF"} type={"number"} value={cpfResponsalve} setValue={setCpfResponsavel} />
            <Campo text={"Data de nascimento"} id={"dataNasc"} type={"date"} value={dataNascUsu} setValue={setDataNascUsu} />
            <Campo text={"E-mail para contato"} id={"emailResp"} placeholder={"Digite o e-mail"} type={"email"} value={emailResponsavel} setValue={setEmailResponsavel} />
            <Campo text={"Digite sua senha"} id={"senhaUsu"} placeholder={"Digite novamente a senha"} type={"password"} value={senhaUsu} setValue={setSenhaUsu} />
            <CheckBoxTermo redirecionamento={"http://localhost:8080/TERMOS.pdf"} textoTermo={"Termos e Condições de Uso"} />
            <CheckBoxTermo redirecionamento={"http://localhost:8080/politica.pdf"} textoTermo={"Política de privacidade"} />

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