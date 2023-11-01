import Header from "../../components/Header";
import Campo from "../../components/Campo";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../Context/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";

function EditarDependente() {
    const {id} = useParams()
    const navihgate = useNavigate()

    
    const [dataNasc, setDataNasc] = useState("")
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [nome, setNome] = useState('')
    const {user}= useContext(GlobalContext)




    function EditarDep() {


        let url = 'http://localhost:3000/student/update/'+id
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              
                cpf: cpf,                
                rg: rg,
                data_nac: dataNasc,
                nome: nome,


            })
        }).then((resp) => resp.json()).then((data) => {
            console.log(data)
            if (data.error) {
                alert("ERRO: "+ data.error)
            } else {
                alert("SUCESSO!")
                navihgate("/listar-dependente")

            }

        })

    }
    function getDependente() {
        console.log(id)
        let url = `http://localhost:3000/student/getOne/${id}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            console.log(data)
            if( data == null || data.error){
                alert("Dependente não encontrado")
                return
            }
               
  
            setDataNasc(data.data_nac.split("T")[0])
            setCpf(data.cpf)
            setRg(data.rg)
            setNome(data.nome)

        })
    }
     useEffect(()=>{
        getDependente()
     },[])



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
                    onClick={EditarDep}
                >
                    Editar
                </button>
            </div>

        </div>
    )
}

export default EditarDependente