
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/ContextProvider";
function Home() {
    const navigate = useNavigate()
    const {user} = useContext(GlobalContext)

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="flex items-center justify-center m-5 md:m-10 mt-24 p-2 md:p-10 bg-gray-900 rounded-3xl ">
                    <div >
                        {user && user.tipo_usuario == 1?"":
                        <button
                            className="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold  py-2 px-4 rounded-full mr-6"
                            onClick={() => navigate('/cadastro')}
                        >
                            Cadastro de usuarios
                        </button>}
                        {user && user.tipo_usuario == 1?
                        
                        <button
                            className="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold py-2 px-4 rounded-full"
                            onClick={() => navigate('/listar-dependente')}
                        >
                            Listar Dependentes
                        </button>
                        
                        :


<>

                        <button
                            className="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold py-2 px-4 rounded-full"
                            onClick={() => navigate('/listar-usuarios')}
                        >
                            Listar usuarios
                        </button>

                        <button
                        className="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold py-2 px-4 rounded-full"
                        onClick={() => navigate('/listar-dependente')}
                        >
                        Listar Alunos
                        </button>
</>
                        
                        
                        }
                        {user && user.tipo_usuario == 1?"":
                        <button
                            className="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold py-2 px-4 rounded-full"
                            onClick={() => navigate('/cadastro-turma')}
                        >
                            Cadastro de turmas
                        </button>}
                        {user && user.tipo_usuario == 1?"":
                        <button
                            className="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold py-2 px-4 rounded-full"
                            onClick={() => navigate('/listar-turmas')}
                        >
                            Listar Turmas
                        </button>}
                    </div>

                </div>

            </div>


        </>)
}

export default Home;