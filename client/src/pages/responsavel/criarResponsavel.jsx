import Header from "../../components/Header";
import Campo from "../../components/Campo";
import CheckBoxTermo from "../../components/checkbox";
// import "./criarResponsavel.css"
import { useState, useEffect } from "react";

function CadastrarResponsavel() {
    const [emailResponsavel, setemailResponsavel] = useState("")
    const [senhaResponsavel, setsenhaResponsavel] = useState("")
    const [senhaResponsavelConfirma, setsenhaResponsavelConfirma] = useState("")
    const [dataNascResponsavel, setdataNascResponsavel] = useState("")
    const [nomeResponsavel, setnomeResponsavel] = useState("")
    const [rgResponsavel, setrgResponsavel] = useState("")
    const [cpfResponsavel, setcpfResponsavel] = useState("")
    const [termosDeUso, setTermosDeUso] = useState(false)
    const [politicaPrivacidade, setPoliticaPrivacidade] = useState(false)

    function CadastrarUsu() {

        const email = document.getElementById('emailResponsavel');
        const dataNasc = document.getElementById('dataNasc');
        const rg = document.getElementById('rg');
        const cpf = document.getElementById('cpf');

        const usuarioPerfil = document.getElementById('usuarioPerfil')
        const nomeResponsavel = document.getElementById('nomePefil');
        const emailResp = document.getElementById("emailResponsavel");
        const dataNascResp = document.getElementById("dataNasc");
        const rgResp = document.getElementById("rgResp");
        const cpfResp = document.getElementById("cpfResp");



        let url = 'http://localhost:3000/profile/create'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                // usuario_id: usuarioPerfil.value,
                cpf: cpf.value,
                email: emailResp.value,
                rg: rgResp.value,
                data_nac: dataNascResp.value,
                nome: nomeResponsavel.value,
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

            <Header title={"Finalizar Cadastro"} />
            <Campo text={"Nome"} id={"nomePefil"} placeholder={"Digite o nome"} type={"text"} value={nomeResponsavel} setValue={setnomeResponsavel} />
            <Campo text={"RG"} id={"rg"} placeholder={"Digite o RG"} type={"number"} value={rgResponsavel} setValue={setrgResponsavel} />
            <Campo text={"CPF"} id={"cpf"} placeholder={"Digite o CPF"} type={"number"} value={cpfResponsavel} setValue={setcpfResponsavel} />
            <Campo text={"E-mail institucional"} id={"emailResponsavel"} placeholder={"Digite o e-mail"} type={"email"} value={emailResponsavel} setValue={setemailResponsavel} />
            {/* <div className='mt-5'>
                <label className="text-lg font-bold dark:text-black " >Selecione Usuario</label>
                <select id="usuarioPerfil" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="default" disabled>Selecione Usuario</option>
                    {usuarios.map((ele) => {
                        return (<option key={ele.value} value={ele.value}>{ele.label}</option>)
                    })}
                </select>
                </div> */}
            <Campo text={"Data de nascimento"} id={"dataNasc"} type={"date"} value={dataNascResponsavel} setValue={setdataNascResponsavel} />
            <Campo text={"Atualize a senha"} id={"senhaResponsavel"} placeholder={"Senha do usuário"} type={"password"} value={senhaResponsavel} setValue={setsenhaResponsavel} />
            <Campo text={"Confirme a senha"} id={"senhaResponsavelConfirma"} placeholder={"Digite novamente a senha"} type={"password"} value={senhaResponsavelConfirma} setValue={setsenhaResponsavelConfirma} />
            {/* <div class="flex items-center">
                <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checked-checkbox" class="ml-2 text-sm font-medium text-gray-900">Eu li e concordo com os <a className="linkTermo" href="http://"> Termos e Condições de Uso. </a></label>
            </div> */}
            <CheckBoxTermo redirecionamento={"algumlugar"} textoTermo={"Termos e Condições de Uso"} />
            <CheckBoxTermo redirecionamento={"algumlugar"} textoTermo={"Politica de privacidade"} />
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

export default CadastrarResponsavel