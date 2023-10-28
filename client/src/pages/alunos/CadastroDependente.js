import Header from "../../components/Header";
import Campo from "../../components/Campo";
import { useState, useEffect } from "react";

function CadastrarDependente() {

    
    const [dataNasc, setDataNasc] = useState("")
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [nome, setNome] = useState('')




    function CadastrarUsu(id) {

        const dataNasc = document.getElementById('dataNasc');
      
        const nome = document.getElementById("nome");
        const rg = document.getElementById("rg");
        const cpf= document.getElementById("cpf");


        let url = 'http://localhost:3000/student/create'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: id,
                cpf: cpf.value,                
                rg: rg.value,
                data_nac: dataNasc.value,
                nome: nome.value

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

            <Header title={"Perfil dependente"} />

            <Campo text={"Nome"} id={"nome"} placeholder={"Digite o nome"} type={"text"} value={nome} setValue={setNome} />
            <Campo text={"RG"} id={"rg"} placeholder={"Digite o RG"} type={"number"} value={rg} setValue={setRg} />
            <Campo text={"CPF"} id={"cpf"} placeholder={"Digite o CPF"} type={"number"} value={cpf} setValue={setCpf} />
            <Campo text={"Data de nascimento"} id={"dataNasc"} type={"date"} value={dataNasc} setValue={setDataNasc} />

            <div className="mt-5 mb-5 flex items-center justify-center" >
                <button
                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                    onClick={CadastrarUsu}
                >
                    Cadastrar
                </button>
            </div>

        </div>
    )
}

export default CadastrarDependente