import React from 'react';
import "../pages/perfil/criarResponsavel.css";

export default function CheckBoxTermo({ textoTermo, redirecionamento, onChange }) {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                onChange={onChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900">
                Eu li e concordo com os <a className="linkTermo" target='_blank' href={redirecionamento}> {textoTermo} </a>
            </label>
        </div>
    );
}