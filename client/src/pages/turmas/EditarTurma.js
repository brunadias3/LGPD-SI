import Header from "../../components/Header";
import Campo from "../../components/Campo";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function EditarTurma() {

    const [nomeTurma, setNomeTurma] = useState('');
    const { id } = useParams();


    function updateTurma() {

        const nomeTurma = document.getElementById('nomeTurma');
        const descricaoTurma = document.getElementById('descricaoTurma')

        if (id) {
            let url = `http://localhost:3000/team/update/${id}`
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ nome: nomeTurma.value, descricao: descricaoTurma.value })
            }).then((resp) => resp.json()).then((data) => {

                if (data.error) {
                    alert("Fudeu")
                } else {
                    alert("Atualizado com sucesso")
                }

            })
        }


    }

    function getTurmas() {

        const descricaoTurma = document.getElementById('descricaoTurma');

        if (id) {
            let url = `http://localhost:3000/team/get/${id}`
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((resposta) => resposta.json()).then((data) => {

                if (data != null) {
                    setNomeTurma(data.nome);
                    descricaoTurma.value = data.descricao
                }

            })
        }
    }
    useEffect(() => { getTurmas() }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">

            <Header title={"Cadastro de turmas"} />
            <Campo text={"Nome da turma"} id={"nomeTurma"} placeholder={"Digite o nome da turma"} type={"text"} value={nomeTurma} setValue={setNomeTurma} />
            <label className="text-lg font-bold " >Descrição da turma</label>
            <textarea id="descricaoTurma" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Escreva uma descrição para a turma" ></textarea>

            <div className="mt-5 mb-5 flex items-center justify-center" >
                <button
                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
                    onClick={updateTurma}
                >
                    Atualizar Turma
                </button>
            </div>

        </div>
    )
}

export default EditarTurma;
