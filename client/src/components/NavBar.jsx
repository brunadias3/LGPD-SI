
import React, { useState, useContext } from 'react'
import { GlobalContext } from '../Context/ContextProvider'
import { useNavigate } from 'react-router-dom'


function NavBar() {
    const [isChecked, setIsChecked] = useState(false)
    const { user, setUser } = useContext(GlobalContext)
    const navigate = useNavigate()
    const id = 1
    const [perfil, setPerfil] = useState()
    function LogOut(e) {

        e.preventDefault()
        let url = `http://localhost:3000/login/logout`
        fetch(url, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then((resp) => resp.json()).then((data) => {

            if (data.error) {
                alert("ERRO: " + data.error)
            } else {
                setUser({})
                navigate("/")
            }

        })


    }

    return (
        <>{user.id === undefined ? "" :
            <nav className=" border-gray-200 bg-gray-900">

                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        Gerenciamento escolar
                    </span>

                    <div className="flex items-center md:order-2">
                        <button type="button" className="flex py-2 pl-3 pr-4 rounded  md:hover:text-blue-900 md:p-0 text-white md:dark:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700" onClick={() => { setIsChecked(true) }}>
                            Olá!
                        </button>
                        {/* Perfil do usuário */}
                        {isChecked ?
                            (<div className="nav-item absolute right-1 top-16 bg-gray-700 p-8 rounded-lg w-96 z-50">
                                <div className="flex  justify-end">
                                    <button className="font-bold py-2 px-4  hover:bg-gray-900 text-white rounded-full" onClick={() => { setIsChecked(false) }} > x </button>
                                </div>
                                <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">


                                    <div>

                                        <p className="text-gray-500 text-sm font-semiboldtext-gray-400">{user ? user.login : ""}</p>
                                    </div>

                                </div>

                                <div>

                                    <div className="flex gap-5 border-b-1 border-color p-4  cursor-pointer rounded-lg hover:bg-gray-900">
                                        <button
                                            type="button"
                                            className=" text-xl rounded-lg p-3 hover:bg-light-gray  text-gray-200"
                                            onClick={() => navigate("/editar-perfil/" + id)}
                                        >
                                            Editar Perfil
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-5 hover:bg-gray-900 rounded-lg">
                                    <button
                                        onClick={(e) => LogOut(e)}
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
                                <a onClick={() => navigate("/home")} className="cursor-pointer block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 text-white hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700" >Home</a>
                            </li>
                            {user && user.tipo_usuario == 1 ?
                                <li>
                                    <a onClick={() => navigate("/cadastro-dependente")} className="cursor-pointer block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 text-white hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700">Cadastrar Aluno</a>
                                </li> : ""}


                        </ul>
                    </div>
                </div>
            </nav>}

        </>
    );
}

export default NavBar;
