
function GerenciarUsuarios() {
    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                <div >
                    <button
                        class="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold py-2 px-4 rounded-full"
                        onClick={() => window.location.href = '/cadastro'}
                    >
                        Cadastro de usuarios
                    </button>
                    <button
                        class="bg-gray-900  hover:bg-gray-800 text-white text-2xl font-bold py-2 px-4 rounded-full"
                        onClick={() => window.location.href = '/listar-usuarios'}
                    >
                        Listar usuarios
                    </button>
                 
                </div>

            </div>

        </>
    )

}

export default GerenciarUsuarios;