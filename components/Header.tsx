import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-4">
      <div className="flex items-center justify-center space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v10l-7.5 4.5" />
          <path d="M12 22v-10l7.5 4.5" />
          <path d="M2.5 16.5L12 12l9.5 4.5" />
        </svg>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-500">
          OdinX Color Lab
        </h1>
      </div>
      <p className="mt-2 text-lg text-gray-400">Asistente de Formulación Visual</p>
    </header>
  );
};

export default Header;