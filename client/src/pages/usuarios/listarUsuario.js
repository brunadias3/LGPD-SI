import { useEffect, useState } from "react";
import Header from "../../components/Header";


function ListarUsuario() {
    const headers = ["E-mail", "Turma", "Editar", "Deletar"]
    const [usuarios, setUsuarios] = useState([])

    function getUsuario() {
        let url = 'http://localhost:3000/user/list'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            
            var usuarios = []
            data[0].map(element => {

                usuarios.push({
                    id: element.id,
                    email: element.login,
                    turma: element.Nome
                })
            
            });
            setUsuarios(usuarios)
        })
    }


    function deletarUsuario(id) {

        let url = `http://localhost:3000/user/delete/${id}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id: id })
        }).then((resp) => resp.json()).then((data) => {

            if (data.error) {
                alert("Fudeu")
            } else {
                alert("Deletado")
            }

        })
    }

    useEffect(() => { getUsuario() }, [])

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header title={'Listar Usuários'} />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400 content-center">
                        <tr>
                            {headers.map((header) =>
                                <th scope="col" className="px-6 py-3" key={header}>
                                    {header}
                                </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(dat => {
                            return (
                                <tr key={dat.id} className="bg-white hover:bg-gray-50 dark:hover:bg-gray-300 content-center">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        {dat.email}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        {dat.turma}
                                    </td>

                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        <button onClick={() => { }} className="bg-gray-900  hover:bg-gray-800 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Atualizar</button>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">

                                        <button
                                            className="bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20"
                                            onClick={() => deletarUsuario(dat.id)}
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default ListarUsuario;