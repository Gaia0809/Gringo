const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Supporto tecnico', path: '/supporto' },
    { label: 'Gestione veicoli', path: '/veicoli' },
    { label: 'Gestione stazioni', path: '/stazioni' },
]

const Header = ({ activePage }: { activePage: string }) => (
    <div className="flex flex-wrap items-center gap-2">
        {menuItems.map((item) => (
            <button
                key={item.label}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${item.label === activePage
                    ? 'bg-slate-950 text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'
                    }`}
            >
                {item.label}
            </button>
        ))}
    </div>
)

export default Header