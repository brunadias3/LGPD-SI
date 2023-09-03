import React from 'react'


export default function Campo({ id, text, placeholder, type, value, setValue }) {
  return (
    <>
      <label className="text-lg font-bold " htmlFor={id}>{text}</label>
      <div className='mb-6 flex'>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={id} placeholder={placeholder}
          name={id} type={type}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
    </>
  )
}