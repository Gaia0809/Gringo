import React, { createContext, useContext, useState, useEffect } from 'react';
import Button from './ui/Button';
import SearchableSelect from './ui/SearchableSelect';

const FormContext = createContext(null);

/**
 * Componente interno Field per gestire label ed errori.
 */
const Field = ({ label, children, error, className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
      {label}
    </label>
    {children}
    {error && (
      <span className="text-[10px] font-bold text-stato-guasto uppercase tracking-wide">
        {Array.isArray(error) ? error[0] : error}
      </span>
    )}
  </div>
);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormContext must be used within a SmartForm");
  return context;
};

/**
 * SmartForm: Gestore centralizzato dello stato del form.
 */
export const SmartForm = ({ 
  initialValues = {}, 
  onSubmit, 
  onCancel, 
  children, 
  submitLabel = "Salva",
  cancelLabel = "Annulla",
  isReadOnly = false,
  className = "flex flex-col gap-4"
}) => {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(initialValues);
  }, [JSON.stringify(initialValues)]);

  const handleChange = (name, value) => {
    if (isReadOnly) return;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isReadOnly) return;
    
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (err) {
      console.error("Form Submit Error:", err);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider value={{ values, handleChange, loading, errors, isReadOnly }}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
        
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button variant="ghost" onClick={onCancel} type="button">
            {isReadOnly ? 'Chiudi' : cancelLabel}
          </Button>
          {!isReadOnly && (
            <Button type="submit" disabled={loading}>
              {loading ? 'Caricamento...' : submitLabel}
            </Button>
          )}
        </div>
      </form>
    </FormContext.Provider>
  );
};

/**
 * Componenti di Input "Connessi"
 */

const inputClass = "p-2.5 border border-gray-200 rounded-xl outline-none focus:border-brand-testo transition-colors text-sm bg-brand-sfondowidget text-brand-testo w-full disabled:opacity-50";

export const SmartInput = ({ name, label, type = "text", placeholder, required = false, rows, ...props }) => {
  const { values, handleChange, isReadOnly, errors } = useFormContext();
  
  const commonProps = {
    name,
    value: values[name] || '',
    onChange: (e) => handleChange(name, type === 'checkbox' ? e.target.checked : e.target.value),
    placeholder,
    disabled: isReadOnly,
    required,
    ...props
  };

  return (
    <Field label={label} error={errors[name]}>
      {type === 'textarea' || rows ? (
        <textarea {...commonProps} rows={rows || 3} className={`${inputClass} resize-none`} />
      ) : (
        <input
          {...commonProps}
          type={type}
          checked={type === 'checkbox' ? !!values[name] : undefined}
          className={type === 'checkbox' ? "w-4 h-4 text-brand-testo accent-brand-testo cursor-pointer" : inputClass}
        />
      )}
    </Field>
  );
};

export const SmartSelect = ({ name, label, options = [], required = false, placeholder = "Seleziona..." }) => {
  const { values, handleChange, isReadOnly, errors } = useFormContext();
  
  return (
    <Field label={label} error={errors[name]}>
      <select
        name={name}
        value={values[name] || ''}
        onChange={(e) => handleChange(name, e.target.value)}
        className={inputClass}
        disabled={isReadOnly}
        required={required}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => (
          <option key={opt.id || opt.value} value={opt.id || opt.value}>
            {opt.label || opt.name}
          </option>
        ))}
      </select>
    </Field>
  );
};

export const SmartSearchableSelect = ({ name, label, options = [], placeholder = "Seleziona..." }) => {
  const { values, handleChange, isReadOnly, errors } = useFormContext();
  
  return (
    <Field label={label} error={errors[name]}>
      <SearchableSelect
        value={values[name]}
        onChange={(val) => handleChange(name, val)}
        options={options}
        placeholder={placeholder}
        disabled={isReadOnly}
      />
    </Field>
  );
};
