


function GerenciarTrumas() {
    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                <div >
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

        </>
    )

}

export default GerenciarTrumas;