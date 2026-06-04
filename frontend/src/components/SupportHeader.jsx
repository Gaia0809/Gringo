const menuItems = ['Dashboard', 'Supporto tecnico', 'Gestione veicoli', 'Gestione stazioni']
const activeMenuItem = 'Supporto tecnico'

const SupportHeader = () => (
  <div className="flex flex-wrap items-center gap-2 mb-8">
    {menuItems.map((item) => (
      <button
        key={item}
        type="button"
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${item === activeMenuItem ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'}`}
      >
        {item}
      </button>
    ))}
  </div>
)

export default SupportHeader