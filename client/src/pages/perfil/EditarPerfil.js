import Header from "../../components/Header";
import Campo from "../../components/Campo";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/ContextProvider";
import CheckEmail from "../../components/CheckEmail";

function EditarPerfil() {
    const [emailUsu, setEmailUsu] = useState("");
    const [senhaUsu, setSenhaUsu] = useState("");
    const [senhaUsuConfirma, setSenhaUsuConfirma] = useState("");
    const [dataNascUsu, setDataNascUsu] = useState("");
    const [nomeUsu, setNomeUsu] = useState("");
    const [rgUsu, setRgUsu] = useState("");
    const [cpfUsu, setCpfUsu] = useState("");
    const [termoDate, setTermoDate] = useState("");
    const [privacidadeDate, setPrivacidadeDate] = useState("");
    const [emailDate, setEmailDate] = useState("");
    const [statusEmail, setStatusEmail] = useState(false)

    const { user } = useContext(GlobalContext);
    const navigate = useNavigate();


    async function getTermo() {
        try {
            const termoResponse = await fetch(`http://localhost:3000/responsible/getLog/${user.id}?termo=Termos`);
            const termoData = await termoResponse.json();
            if (termoData.length > 0) {
                setTermoDate(termoData[0].date);
            }
        } catch (error) {
            console.error("Erro ao buscar dados do Termo:", error);
        }
    }

    async function getPrivacidade() {
        try {
            const privacidadeResponse = await fetch(`http://localhost:3000/responsible/getLog/${user.id}?termo=Privilegios`);
            const privacidadeData = await privacidadeResponse.json();
            if (privacidadeData.length > 0) {
                setPrivacidadeDate(privacidadeData[0].date);

            }
        } catch (error) {
            console.error("Erro ao buscar dados da Privacidade:", error);
        }
    }

    async function getEmail() {
        try {
            const emailResponse = await fetch(`http://localhost:3000/responsible/getLog/${user.id}?termo=Email`);
            const emailData = await emailResponse.json();
            if (emailData.length > 0) {
                setEmailDate(emailData[0].date);
                setStatusEmail(emailData[0].status === 'true');
            }
        } catch (error) {
            console.error("Erro ao buscar dados da Email:", error);
        }
    }
    async function getLogs() {
        if (!user || user === null) {
            navigate("/");
            console.log(user);
            return;
        }

        await getUser();
        await getTermo();
        await getPrivacidade();
        await getEmail();
    }

    const handleEmailChange = () => {
        setStatusEmail(!statusEmail);
    };

    async function getUser() {
        let url = `http://localhost:3000/responsible/getOne/${user.id}`;
        fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            setNomeUsu(data.nome);
            setEmailUsu(data.email);
            setRgUsu(data.rg);
            setCpfUsu(data.cpf);
            var partesData = data.data_nac.split("T")[0];
            setDataNascUsu(partesData);

        });
    }

    function EditarUsu() {
        let dados = {
            cpf: cpfUsu,
            email: emailUsu,
            rg: rgUsu,
            data_nac: dataNascUsu,
            nome: nomeUsu,
            senha: senhaUsu == "" ? null : senhaUsu,
            statusEmail: statusEmail.toString()

        };

        let url = `http://localhost:3000/responsible/update/${user.id}`;
        fetch(url, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dados)
        }).then((resp) => resp.json()).then((data) => {
            if (data.error) {
                alert("ERRO: " + data.error);
            } else {
                alert("SUCESSO!");
                navigate('/home');
            }
        });
    }

    useEffect(() => {
        getLogs();
    }, []);

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
                <div><label> <a className="linkTermo" target='_blank' href="http://localhost:8080/TERMOS.pdf">Termo</a> aceito em: {termoDate}</label></div>
                <div><label> <a className="linkTermo" target='_blank' href="http://localhost:8080/politica.pdf">Privacidade</a> aceito em: {privacidadeDate}</label></div>
                <div className="flex items-center">
                    <CheckEmail checked={statusEmail} onChange={() => setStatusEmail(!statusEmail)} />
                    <label className="ml-2">
                    / ultima atualização: {emailDate}
                    </label>
                </div>

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