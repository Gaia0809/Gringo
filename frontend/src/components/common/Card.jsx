import React from 'react';

/**
 * Common Card component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content of the card
 * @param {string} [props.title] - Optional title
 * @param {string} [props.className] - Additional classes
 * @param {boolean} [props.noPadding] - Removes default padding
 */
export default function Card({ children, title, className = "", noPadding = false }) {
  return (
    <div className={`card ${noPadding ? '!p-0' : ''} ${className}`}>
      {title && <h3 className="text-base font-bold text-brand-testo mb-4">{title}</h3>}
      {children}
    </div>
  );
}
