import Header from "../../components/Header";
import Campo from "../../components/Campo";
import { useEffect, useState } from "react";

function GerenciarAluno() {

    const [turmas, setTurmas] = useState([])

    function getTurma() {

        let url = 'http://localhost:3000/team/list'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            var turmas = []
            data.map((element) => {
                turmas.push({
                    id: element.id,
                    nome: element.nome,
                })
                return setTurmas(turmas)
            });

        })
    }

    useEffect(() => { getTurma() }, [])


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
            
            <Header title={"Gerenciamento do aluno"} />
            <div className='mt-5'>
                <label className="text-lg font-bold dark:text-black " >Selecione uma Turma</label>
                <select id="turmaUsu" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="default" disabled>Selecione uma Turma</option>
                    {turmas.map((ele) => {
                        return (<option key={ele.id} value={ele.id}>{ele.nome}</option>)
                    })}
                </select>
            </div>

            <div className='mt-5 m-0.5'>
                <label className="text-lg font-bold dark:text-black " >Status do aluno</label>
                <select id="status" defaultValue='default' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option value="default" disabled>Selecione uma opção</option>
                    <option value='1'>Ativo</option>
                    <option value='0'>Inativo</option>
                </select>
            </div>



            <div className="mt-5 mb-5 flex items-center justify-center" >
                <button
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={''}
                >
                    Alterar
                </button>
            </div>
            <div>
            </div>
        </div>
    )

}

export default GerenciarAluno;
