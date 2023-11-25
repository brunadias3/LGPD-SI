import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/ContextProvider";


function ListarDependente() {
    console.log("jessussssssssssssss")
    
    const [alunos, setAlunos] = useState([])
    var isLoading = false
    const navigate = useNavigate()
    const {user} = useContext(GlobalContext)
    const headers = user && user.tipo_usuario == 1?["Nome", "Editar"]:["Nome"]
  
    const usuarios = [
        {nome: 'Antonio'}
    ]

   
        
    
        function getUsuario() {
            if(user == null){
                navigate("/")
                
            }
            if(isLoading)
                return
            isLoading = true
            let url = 'http://localhost:3000/student/list/'+user.id
            fetch(url, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((resposta) => resposta.json()).then((data) => {
                console.log(data);
                if(data.error){
                    console.log('error')
                    return
                }
                var dependentes = []
                data.map(element => {
    
                    dependentes.push({
                        id: element.id,
                        nome: element.nome,
                    })
                
                });
                setAlunos(dependentes)
            })
        }
        useEffect(()=>{
            getUsuario()

        },[])


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header title={'Listar Dependentes'} />

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
                        {alunos.map(dat => {
                            return (
                                <tr key={dat.id} className="bg-white hover:bg-gray-50 dark:hover:bg-gray-300 content-center">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        {dat.nome}
                                    </td>
                                   
                                    {user && user.tipo_usuario == 1?
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        <button onClick={() => navigate("/editar-dependente/"+dat.id)} className="bg-gray-900  hover:bg-gray-800 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Atualizar</button>
                                    </td>:""}
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

export default ListarDependente;