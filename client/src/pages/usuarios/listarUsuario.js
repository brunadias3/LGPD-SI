import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/ContextProvider";


function ListarUsuario() {
    const headers = ["E-mail", "Editar"]
    const [usuarios, setUsuarios] = useState([])
    const navigate = useNavigate()
    const {user} = useContext(GlobalContext)

    function getUsuario() {
        if(user == null){
            navigate("/")
        }
        let url = 'http://localhost:3000/user/list'
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then((resposta) => resposta.json()).then((data) => {
            console.log(data);
            var usuarios = []
            data.map(element => {
                if(element.id !== user.id){
                    usuarios.push({
                        id: element.id,
                        email: element.login,
                    })

                }


              
            
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
            <Header title={'Listar Responsáveis'} />

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
                                        <button onClick={() => navigate("/editar-usuario/"+dat.id)} className="bg-gray-900  hover:bg-gray-800 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Atualizar</button>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">

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