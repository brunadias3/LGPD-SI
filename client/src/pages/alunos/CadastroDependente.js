import Header from "../../components/Header";
import Campo from "../../components/Campo";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

function CadastrarDependente() {

    
    const [dataNasc, setDataNasc] = useState("")
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [nome, setNome] = useState('')
    const {user}= useContext(GlobalContext)
    const navigate = useNavigate()




    function CadastrarUsu(id) {


        let url = 'http://localhost:3000/student/create'
        fetch(url, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              
                cpf: cpf,                
                rg: rg,
                data_nac: dataNasc,
                nome: nome,
                id:user.id


            })
        }).then((resp) => resp.json()).then((data) => {

            if (data.error) {
                console.log(data.error)
                alert("ERRO: "+ data.error)
            } else {
                alert("SUCESSO!")
                navigate("/listar-dependente")

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