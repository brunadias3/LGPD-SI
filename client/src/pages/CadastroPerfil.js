import Header from "../components/Header";
import Campo from "../components/Campo";
import { useState, useEffect } from "react";

function CadastrarPerfil() {
    const [emailUsu, setEmailUsu] = useState("")
    const [senhaUsu, setSenhaUsu] = useState("")
    const [senhaUsuConfirma, setSenhaUsuConfirma] = useState("")
    const [dataNascUsu, setDataNascUsu] = useState("")
    const [nomeUsu, setNomeUsu] = useState("")
    const [rgUsu, setRgUsu] = useState("")
    const [cpfUsu, setCpfUsu] = useState("")

    const [cpfResponsalve, setCpfResponsavel] = useState('')
    const [emailResponsavel, setEmailResponsavel] = useState('')
    const [rgResponsavel, setRgResponsavel] = useState('')
    const [dataNascResponsavel, setDataNascResponsavel] = useState('')
    const [nomeResponsavel, setNomeResponsavel] = useState('')
    const [usuarios, setUsuarios] = useState([])


    function getUser() {

        let url = 'http://localhost:3000/user/list'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            var users = []
            data.map((element) => {
                users.push({
                    value: element.id,
                    label: element.login,
                })
                return setUsuarios(users)
            });

        })
    }



    function CadastrarUsu() {

        const email = document.getElementById('emailInst');
        const dataNasc = document.getElementById('dataNasc');
        const nomeUsu = document.getElementById('nomePefil');
        const rg = document.getElementById('rg');
        const cpf = document.getElementById('cpf');
        const usuarioPerfil = document.getElementById('usuarioPerfil')


        const emailResp = document.getElementById("emailResp");
        const dataNascResp = document.getElementById("dataNascResp");
        const nomeResp = document.getElementById("nomeResp");
        const rgResp = document.getElementById("rgResp");
        const cpfResp = document.getElementById("rgResp");

        function verificaBody() {
            if (verificarIdade()) {
                let menorDeIdade = {
                    usuario_id: usuarioPerfil.value,
                    cpf: cpf.value,
                    email: email.value,
                    rg: rg.value,
                    data_nac: dataNasc.value,
                    nome: nomeUsu.value,
                    cpf_res: cpfResp.value,
                    email_res: emailResp.value,
                    rg_res: rgResp.value,
                    data_nac_res: dataNascResp.value,
                    nome_res: nomeResp.value
                }

                return menorDeIdade;
            } else {
                let maiorDeIdade = {
                    usuario_id: usuarioPerfil.value,
                    cpf: cpf.value,
                    email: email.value,
                    rg: rg.value,
                    data_nac: dataNasc.value,
                    nome: nomeUsu.value,

                }
                return maiorDeIdade;
            }
        }

        let url = 'http://localhost:3000/profile/create'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(verificaBody())
        }).then((resp) => resp.json()).then((data) => {

            if (data.error) {
                alert("Fudeu")
            } else {
                alert("Foi")
            }

        })

    }

    function verificarIdade() {

        const dataNasc = document.getElementById('dataNasc');

        if (dataNasc) {

            const dataNascimentoUsuario = new Date(dataNasc.value);
            const dataAtual = new Date();
            const diferencaEmMilissegundos = dataAtual - dataNascimentoUsuario;
            const milissegundosPorAno = 1000 * 60 * 60 * 24 * 365.25; // Considera anos bissextos
            const idadeEmAnos = diferencaEmMilissegundos / milissegundosPorAno;

            if (idadeEmAnos >= 18) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }


    useEffect(() => { getUser() }, [])
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">

            <Header title={"Finalizar Cadastro"} />
            <Campo text={"Nome"} id={"nomePefil"} placeholder={"Digite o nome"} type={"text"} value={nomeUsu} setValue={setNomeUsu} />
            <Campo text={"RG"} id={"rg"} placeholder={"Digite o RG"} type={"number"} value={rgUsu} setValue={setRgUsu} />
            <Campo text={"CPF"} id={"cpf"} placeholder={"Digite o CPF"} type={"number"} value={cpfUsu} setValue={setCpfUsu} />
            <Campo text={"E-mail institucional"} id={"emailInst"} placeholder={"Digite o e-mail"} type={"email"} value={emailUsu} setValue={setEmailUsu} />



            <div className='mt-5'>
                <label className="text-lg font-bold dark:text-black " >Selecione Usuario</label>
                <select id="usuarioPerfil" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="default" disabled>Selecione Usuario</option>
                    {usuarios.map((ele) => {
                        return (<option key={ele.value} value={ele.value}>{ele.label}</option>)
                    })}
                </select></div>

            <Campo text={"Data de nascimento"} id={"dataNasc"} type={"date"} value={dataNascUsu} setValue={setDataNascUsu} />

            {
                verificarIdade() ?
                    <>
                        <Campo text={"Nome Responsável"} id={"nomeResp"} placeholder={"Digite o nome"} type={"text"} value={nomeResponsavel} setValue={setNomeResponsavel} />
                        <Campo text={"RG Responsável"} id={"rgResp"} placeholder={"Digite o RG"} type={"number"} value={rgResponsavel} setValue={setRgResponsavel} />
                        <Campo text={"CPF Responsável"} id={"cpfResp"} placeholder={"Digite o CPF"} type={"number"} value={cpfResponsalve} setValue={setCpfResponsavel} />
                        <Campo text={"E-mail Responsável"} id={"emailResp"} placeholder={"Digite o e-mail"} type={"email"} value={emailResponsavel} setValue={setEmailResponsavel} />
                        <Campo text={"Data de nascimento responsável"} id={"dataNascResp"} type={"date"} value={dataNascResponsavel} setValue={setDataNascResponsavel} />
                    </>

                    : (null)
            }

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

        </div>
    )
}

export default CadastrarPerfil