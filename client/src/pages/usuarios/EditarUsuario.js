import Header from "../../components/Header";
import Campo from "../../components/Campo";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarUsuario() {
    const { id } = useParams();
    const [emailUsu, setEmailUsu] = useState("")
    const [dataNascUsu, setDataNascUsu] = useState("")
    const [nomeUsu, setNomeUsu] = useState("")
    const [rgUsu, setRgUsu] = useState("")
    const [cpfUsu, setCpfUsu] = useState("")
    const navigate = useNavigate()
  

    function getUser() {
        console.log(id)
        let url = `http://localhost:3000/responsible/getOne/${id}`
        fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            if(data.error){
                return
            }
            console.log(data)
            setNomeUsu(data.nome)
            setEmailUsu(data.email)
            setRgUsu(data.rg)
            setCpfUsu(data.cpf)
            var partesData = data.data_nac.split('T')[0]
            setDataNascUsu(partesData)

        })
    }
    function EditarUsu() {
                let data = {
                    usuario_id: id,
                    cpf: cpfUsu,
                    email: emailUsu,
                    rg: rgUsu,
                    data_nac: dataNascUsu,
                    nome: nomeUsu
                }


        let url = `http://localhost:3000/responsible/update/${id}`
        fetch(url, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json()).then((data) => {

            if (data.error) {
                alert("ERRO: "+data.error)
            } else {
                alert("SUCESSO!")
                navigate("/listar-usuarios")
            }

        })

    }
   

    useEffect(() => { getUser() }, [])
  
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">

            <Header title={"Editar Perfil"} />
            <Campo text={"Nome"} id={"nomePefil"} placeholder={"Digite o nome"} type={"text"} value={nomeUsu} setValue={setNomeUsu} />
            <Campo text={"RG"} id={"rg"} placeholder={"Digite o RG"} type={"number"} value={rgUsu} setValue={setRgUsu} />
            <Campo text={"CPF"} id={"cpf"} placeholder={"Digite o CPF"} type={"text"} value={cpfUsu} setValue={setCpfUsu} />
            <Campo text={"E-mail institucional"} id={"emailInst"} placeholder={"Digite o e-mail"} type={"email"} value={emailUsu} setValue={setEmailUsu} />
            <Campo text={"Data de nascimento"} id={"dataNasc"} type={"date"} value={dataNascUsu} setValue={setDataNascUsu} />

      


            <div className="mt-5 mb-5 flex items-center justify-center" >
                <button
                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                    onClick={EditarUsu}
                >
                    Salvar alterações
                </button>
            </div>

        </div>
    )
}

export default EditarUsuario