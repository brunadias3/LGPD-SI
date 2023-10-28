import Header from "../../components/Header";
import Campo from "../../components/Campo";
import { useState, useEffect } from "react";

function CadastrarAluno() {
    const [dataNascAluno, setdataNascAluno] = useState("")
    const [nomeAluno, setnomeAluno] = useState("")
    const [rgAluno, setrgAluno] = useState("")
    const [cpfAluno, setcpfAluno] = useState("")

    function cadastrarAluno() {
        const email = document.getElementById('emailInst');
        const dataNasc = document.getElementById('dataNasc');
        const nomeAluno = document.getElementById('nomePefil');
        const rg = document.getElementById('rg');
        const cpf = document.getElementById('cpf');
        const usuarioPerfil = document.getElementById('usuarioPerfil')

        let url = 'http://localhost:3000/profile/create'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {
                    usuario_id: usuarioPerfil.value,
                    cpf: cpf.value,
                    email: email.value,
                    rg: rg.value,
                    data_nac: dataNasc.value,
                    nome: nomeAluno.value,
                }
            )
        }).then((resp) => resp.json()).then((data) => {

            if (data.error) {
                alert("ops q pena né amigao")
            } else {
                alert("Foi")
            }

        })

    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
            <Header title={"Cadastrar Aluno"} />
            <Campo text={"Nome"} id={"nomePefil"} placeholder={"Digite o nome"} type={"text"} value={nomeAluno} setValue={setnomeAluno} />
            <Campo text={"RG"} id={"rg"} placeholder={"Digite o RG"} type={"number"} value={rgAluno} setValue={setrgAluno} />
            <Campo text={"CPF"} id={"cpf"} placeholder={"Digite o CPF"} type={"number"} value={cpfAluno} setValue={setcpfAluno} />
            <Campo text={"Data de nascimento"} id={"dataNasc"} type={"date"} value={dataNascAluno} setValue={setdataNascAluno} />
            <div className="mt-5 mb-5 flex items-center justify-center" >
                <button
                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                    onClick={cadastrarAluno}
                >
                    Finalizar o cadastro
                </button>
            </div>

        </div>
    )
}

export default CadastrarAluno