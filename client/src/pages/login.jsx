import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import GithubIcon from "mdi-react/GithubIcon";
import qs from "query-string";
import axios from "axios";
import { Octokit } from "https://esm.sh/@octokit/core";
function Login() {
    var stop = false
    var token = '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'
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const { user, setUser } = useContext(GlobalContext)
    const navigate = useNavigate()
    useEffect(() => {
        console.log(user.id)
        setInterval(() => {
            if (user.id ) {
                navigate('/home')
                return

            } else {

                getUser()

            }

        }, 5 * 1000);


    }, {
        
    })



    function logar(e) {
        e.preventDefault()

        const url = "http://localhost:3000/login/login";

        fetch(url, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({ email: email, senha: senha })

        }).then((resposta) => resposta.json())
            .then((data) => {
                console.log(data)
                if (data.error) {
                    console.log(data.error)
                }
                else {

                    setUser(data.user)
                    navigate('/home')

                }

            }).catch(err => {
                console.log(err)
            })

    }
    const google = () => {
        window.open("http://localhost:3000/auth/google", "_blank", "width=500,height=600");
    };


    function getUser() {

        const url = "http://localhost:3000/login/checkAuthentication";

        fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },

        }).then((resposta) => resposta.json())
            .then((data) => {
                console.log(data)
                if (data.error) {
                    console.log(data.error)
                    stop = false
                }
                else {
                    if (data.user) {
                        stop = true
                        setUser(data.user)
                        navigate('/home')
                    }
                }
            }).catch(err => {
                console.log(err)
            })

    }


    //   function logout(e){
    //     e.preventDefault()
    //     var tokenq = "ya29.a0AfB_byAAHCOL-qJ4pucJyfPz-YnqEj4vD6Kd7LnAjXAfAhUznWCAHZ6-UGhlDl2-PbdL37JR12buESvgFz8jMd1oCbKTQ2_tSNyD5FBhQm8aTUe2PP3ROaaN123BGhqD44r9pRQLUkPbNIkfAV2pY8l5GwXj5jojSzAUaCgYKAVwSARASFQHGX2MiEmTuMpdRyTuiGBk_WwTN0w0171"
    //     fetch('https://oauth2.googleapis.com/revoke?token='+tokenq,{
    //         method:"POST",
    //         headers: {'Content-type': "application/x-www-form-urlencoded"}
    //     }).then((data)=>{
    //         console.log(data)

    //     })

    //         }


    return (
        <section class="bg-gray-50">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <button type="submit" onClick={(e) => logar(e)} class="w-full text-black bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login</button>
                            <button

                                onClick={() => google()}

                            >


                                <span>Login com o Google</span>

                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Login;