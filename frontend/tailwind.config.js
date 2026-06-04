/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          testo: '#100B0C',
          sfondo: '#ffffff',
          sfondoelementi: '#ECEBF0',
          sfondowidget: '#F5F5F7',
        },
        stato: {
          disponibile: '#76E8FF',
          attivo: '#12FF06',
          inricarica: '#FFBD53',
          manutenzione: '#8A8A8B',
          offline: '#D0D2D3',
          guasto: '#F75555',
          rubato: '#000000',
        },
        mezzo: {
          auto: '#891A67',
          moto: '#CE98DA',
          bici: '#8EDCDD',
        }
      },
    },
  },
  plugins: [],
}
// DA LEGGERE PER CAPIRE COME RICHIAMARE QUESTE VARIABILI NEL CODICE
// per richimare queste variabili nel codice facciamo: 
// mettiamo un profisso (bg, text, border) 
// mettiamo il nome del gruppo (brand, stato, mezzo)
// poi mettiamo il nome che abbiamo dato ai colori ( disponibile)
// esempio: bg-stato-disponibile, text-brand-testo, border-mezzo-auto