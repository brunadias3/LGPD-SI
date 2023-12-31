import React from 'react';

export default function CheckBoxEmail({ checked, onChange }) {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900">
                Permitir enviar mensagens no email
            </label>
        </div>
    );
}