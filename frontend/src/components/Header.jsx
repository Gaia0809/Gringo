import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-xl font-bold text-brand-testo capitalize">
        {title.replace('-', ' ')}
      </h1>
      
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-brand-testo">Gaia Mantovani</span>
          <span className="text-xs text-gray-500">Admin</span>
        </div>
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200">
          GM
        </div>
      </div>
    </header>
  );
};

export default Header;
