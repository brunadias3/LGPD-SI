import Header from "../../components/Header";
import Campo from "../../components/Campo";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../Context/ContextProvider";

function EditarPerfil() {
    const [emailUsu, setEmailUsu] = useState("")
    const [senhaUsu, setSenhaUsu] = useState("")
    const [senhaUsuConfirma, setSenhaUsuConfirma] = useState("")
    const [dataNascUsu, setDataNascUsu] = useState("")
    const [nomeUsu, setNomeUsu] = useState("")
    const [rgUsu, setRgUsu] = useState("")
    const [cpfUsu, setCpfUsu] = useState("")
    const [privacidade, setPrivacidade] = useState("")
    const [termo, setTermo] = useState("")
    const { user } = useContext(GlobalContext)
    const navigate = useNavigate()

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        const formattedDate = `${day}/${month}/${year}`;
      
        return formattedDate;
      }

    function getUser() {
        if (user == null) {
            navigate("/")

        }
        let url = `http://localhost:3000/responsible/getOne/${user.id}`
        fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            setNomeUsu(data.nome)
            setEmailUsu(data.email)
            setRgUsu(data.rg)
            setCpfUsu(data.cpf)
            var partesData = data.data_nac.split("T")[0];
            setDataNascUsu(partesData)
            setTermo(data.log_termos)
            setPrivacidade(data.log_privacidade)

        })
    }
    function EditarUsu() {
        let dados = {

            cpf: cpfUsu,
            email: emailUsu,
            rg: rgUsu,
            data_nac: dataNascUsu,
            nome: nomeUsu,
            senha: senhaUsu == "" ? null : senhaUsu
        }


        let url = `http://localhost:3000/responsible/update/${user.id}`
        fetch(url, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dados)
        }).then((resp) => resp.json()).then((data) => {

            if (data.error) {
                alert("ERRO: " + data.error)
            } else {
                alert("SUCESSO!")
                navigate('/home')
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
            <Campo text={"Atualize a senha"} id={"senhaUsu"} placeholder={"Senha do usuário"} type={"password"} value={senhaUsu} setValue={setSenhaUsu} />
            <Campo text={"Confirme a senha"} id={"senhaUsuConfirma"} placeholder={"Digite novamente a senha"} type={"password"} value={senhaUsuConfirma} setValue={setSenhaUsuConfirma} />
            <div className="termo-privacidade flex-col">
                <div><label> <a className="linkTermo" target='_blank' href="http://localhost:8080/TERMOS.pdf">Termo</a> aceito em: {formatDate(termo)}</label></div>
                <div><label> <a className="linkTermo" target='_blank' href="http://localhost:8080/politica.pdf">Privacidade</a> aceito em: {formatDate(privacidade)}</label></div>
            </div>
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

export default EditarPerfil