function Home() {

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="flex items-center justify-center m-5 md:m-10 mt-24 p-2 md:p-10 bg-gray-900 rounded-3xl ">
                    <div >
                        <button
                            className="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold  py-2 px-4 rounded-full mr-6"
                            onClick={() => window.location.href = '/cadastro'}
                        >
                            Cadastro de usuarios
                        </button>
                        <button
                            className="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold py-2 px-4 rounded-full"
                            onClick={() => window.location.href = '/listar-usuarios'}
                        >
                            Listar usuarios
                        </button>
                        <button
                            className="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold py-2 px-4 rounded-full"
                            onClick={() => window.location.href = '/cadastro-turma'}
                        >
                            Cadastro de turmas
                        </button>
                        <button
                            className="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold py-2 px-4 rounded-full"
                            onClick={() => window.location.href = '/listar-turmas'}
                        >
                            Listar Turmas
                        </button>
                    </div>

                </div>

            </div>


        </>)
}

export default Home;