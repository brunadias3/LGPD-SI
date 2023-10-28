import { useEffect, useState } from "react";
import Header from "../../components/Header";


function ListarDependente() {
    const headers = ["Nome", "Editar"]
  
    const usuarios = [
        {nome: 'Antonio'}
    ]


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
                        {usuarios.map(dat => {
                            return (
                                <tr key={dat.id} className="bg-white hover:bg-gray-50 dark:hover:bg-gray-300 content-center">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        {dat.nome}
                                    </td>
                                   

                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray">
                                        <button onClick={() => window.location.href = "/cadastro-dependente"} className="bg-gray-900  hover:bg-gray-800 text-white font-bold py-2 px-4 rounded inline-flex items-center right-20">Atualizar</button>
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

export default ListarDependente;