import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-purple-400"><path d="M15.5 2.5a2.5 2.5 0 0 1 3 3L8 21.5a2.5 2.5 0 0 1-3-3L15.5 2.5z" /><path d="m21.5 8-3-3" /><path d="M12.5 15.5 11 14" /></svg>
            <h1 className="text-xl md:text-2xl font-bold ml-3 rtl:ml-0 rtl:mr-3">
              مولّد الألغاز الفنية
            </h1>
        </div>
        <a 
          href="https://ai.google.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
        >
          مدعوم بواسطة Gemini
        </a>
      </div>
    </header>
  );
};

export default Header;