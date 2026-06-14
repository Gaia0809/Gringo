import React, { createContext, useContext, useState, useEffect } from 'react';
import Button from './ui/Button';
import SearchableSelect from './ui/SearchableSelect';

/**
 * ============================================================
 * CONTEXT: FormContext
 * ============================================================
 * Crea un canale di comunicazione tra il componente SmartForm
 * (il "cervello" del form) e tutti i suoi input figli.
 * Questo evita il "prop drilling", permettendo a SmartInput, 
 * SmartSelect ecc. di accedere a valori ed errori ovunque
 * siano annidati.
 * ============================================================
 */
const FormContext = createContext(null);

/**
 * Componente interno Field: gestisce label, wrapper e visualizzazione errori.
 * Viene usato internamente dai componenti SmartInput/Select per coerenza visiva.
 */
const Field = ({ label, children, error, className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
      {label}
    </label>
    {children}
    {/* Visualizzazione dell'errore (se presente) validato dal backend */}
    {error && (
      <span className="text-[10px] font-bold text-stato-guasto uppercase tracking-wide">
        {Array.isArray(error) ? error[0] : error}
      </span>
    )}
  </div>
);

/**
 * Hook personalizzato per consumare il contesto del form in modo sicuro.
 */
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormContext must be used within a SmartForm");
  return context;
};

/**
 * ============================================================
 * COMPONENTE: SmartForm
 * ============================================================
 * Gestore centralizzato dello stato, validazione e invio dei form.
 * Automatizza il caricamento, la gestione degli errori API e 
 * fornisce i pulsanti standard di azione (Salva/Chiudi).
 * ============================================================
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

  // ============================================================
  // USE STATE
  // ============================================================
  
  // Valori correnti dei campi del form
  const [values, setValues] = useState(initialValues);
  
  // Stato di caricamento durante l'invio asincrono
  const [loading, setLoading] = useState(false);
  
  // Errori ritornati dal backend (mappa nome_campo -> messaggio)
  const [errors, setErrors] = useState({});


  // ============================================================
  // USE EFFECT
  // ============================================================
  // Sincronizza lo stato interno se i valori iniziali cambiano 
  // (es. quando si apre la modale su un veicolo diverso).
  useEffect(() => {
    setValues(initialValues);
  }, [JSON.stringify(initialValues)]);


  // ============================================================
  // FUNZIONI DI GESTIONE
  // ============================================================

  // Gestisce il cambio di valore in un qualsiasi input figlio
  const handleChange = (name, value) => {
    if (isReadOnly) return;
    
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Se c'era un errore su questo campo, lo rimuoviamo appena l'utente digita
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Gestisce l'invio del form al backend
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isReadOnly) return;
    
    setLoading(true);
    try {
      // Invochiamo la callback passata dal componente padre
      await onSubmit(values);
    } catch (err) {
      console.error("Form Submit Error:", err);
      // Se il backend ritorna errori di validazione (422), li iniettiamo nello stato
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <FormContext.Provider value={{ values, handleChange, loading, errors, isReadOnly }}>
      <form onSubmit={handleSubmit} className={className}>
        
        {/* Contenuto del form (Input) */}
        {children}
        
        {/* Pulsantiera Standard a fondo form */}
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
 * ============================================================
 * COMPONENTI DI INPUT "CONNESSI"
 * ============================================================
 * Questi componenti usano FormContext per connettersi
 * automaticamente allo stato di SmartForm.
 * ============================================================
 */

const inputClass = "p-2.5 border border-gray-200 rounded-xl outline-none focus:border-brand-testo transition-colors text-sm bg-brand-sfondowidget text-brand-testo w-full disabled:opacity-50";

/**
 * SmartInput: Gestisce input text, number, checkbox e textarea.
 */
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

/**
 * SmartSelect: Standard HTML select collegata al form.
 */
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

/**
 * SmartSearchableSelect: Select con ricerca, ideale per veicoli o stazioni.
 */
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
