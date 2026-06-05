import React from 'react';

/**
 * Common SearchInput component
 * @param {Object} props
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.className] - Additional classes for the container
 */
export default function SearchInput({ value, onChange, placeholder = "Cerca...", className = "" }) {
  return (
    <div className={`flex items-center bg-brand-sfondo px-4 py-2 rounded-xl border border-gray-200 shadow-sm ${className}`}>
      <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        className="border-none outline-none text-sm w-full bg-transparent text-brand-testo font-medium placeholder:text-gray-400"
      />
    </div>
  );
}
