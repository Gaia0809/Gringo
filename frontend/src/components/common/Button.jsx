import React from 'react';

/**
 * Common Button component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Label or content
 * @param {Function} [props.onClick] - Click handler
 * @param {'primary' | 'outline' | 'ghost' | 'danger'} [props.variant] - Style variant
 * @param {string} [props.className] - Additional classes
 * @param {boolean} [props.disabled] - Disabled state
 * @param {'button' | 'submit' | 'reset'} [props.type] - Button type
 */
export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = "", 
  disabled = false,
  type = 'button'
}) {
  const baseStyles = "px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-brand-testo text-brand-sfondo hover:opacity-90",
    outline: "bg-brand-sfondo text-brand-testo border border-gray-200 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100 shadow-none",
    danger: "bg-stato-guasto text-white hover:opacity-90"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
