
import React, { useState, useEffect } from 'react'


function NavBar() {
    const [isChecked, setIsChecked] = useState(false)
    //const { id } = useParams();
    const id = 1
    const [perfil, setPerfil] = useState()
    function getPerfil() {
        if (id) {
            let url = `http://localhost:3000/profile/getOne/${id}`
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then((resposta) => resposta.json()).then((data) => {
                setPerfil(data)
            })
        }
    }
    useEffect(() => { getPerfil() }, [])

    return (
        <>
            <nav className=" border-gray-200 bg-gray-900">

                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        Gerenciamento escolar
                    </span>

                    <div className="flex items-center md:order-2">
                        <button type="button" className="flex py-2 pl-3 pr-4 rounded  md:hover:text-blue-900 md:p-0 text-white md:dark:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700" onClick={() => { setIsChecked(true) }}>
                            Ola, nome usuario
                        </button>
                        {/* Perfil do usuário */}
                        {isChecked ?
                            (<div className="nav-item absolute right-1 top-16 bg-gray-700 p-8 rounded-lg w-96 z-50">
                                <div className="flex  justify-end">
                                    <button className="font-bold py-2 px-4  hover:bg-gray-900 text-white rounded-full" onClick={() => { setIsChecked(false) }} > x </button>
                                </div>
                                <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">


                                    <div>
                                        <p className="font-semibold text-xl text-gray-200"> Nome do usuario </p>
                                        <p className="text-gray-500 text-sm font-semiboldtext-gray-400">Email do usuario</p>
                                    </div>

                                </div>

                                <div>

                                    <div className="flex gap-5 border-b-1 border-color p-4  cursor-pointer rounded-lg hover:bg-gray-900">
                                        <button
                                            type="button"
                                            className=" text-xl rounded-lg p-3 hover:bg-light-gray  text-gray-200"
                                            onClick={() => { window.location.href = "/editar-perfil/" + id }}
                                        >
                                            Editar Perfil
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-5 hover:bg-gray-900 rounded-lg">
                                    <button
                                        type="button"
                                        style={{ color: "white", borderRadius: "10px" }}
                                        className={`p-3 w-full hover:drop-shadow-xl `}
                                    >
                                        Sair
                                    </button>
                                </div>
                            </div>)
                            : null
                        }

                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" >
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  bg-gray-800 md:bg-gray-900 border-gray-700">
                            <li>
                                <a onClick={() => window.location.href = "/"} className="cursor-pointer block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 text-white hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700" >Home</a>
                            </li>
                            {/* <li>
                                <a onClick={() => window.location.href = "/gerenciar-usuarios"} className="cursor-pointer block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 text-white hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Gerenciar Usuários</a>
                            </li> */}

                            <li>
                                <a onClick={() => window.location.href = "/cadastro-perfil"} className="cursor-pointer block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 text-white hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Cadastro de perfils</a>
                            </li>
                            {/* <li>
                                <a onClick={() => window.location.href = "/gerenciar-turma"} className= "cursor-pointer block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 text-white hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Gerenciamento de turmas</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}

export default NavBar;
