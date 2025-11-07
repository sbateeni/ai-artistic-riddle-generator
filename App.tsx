import React from 'react';
import Header from './components/Header';
import GeneratorView from './components/GeneratorView';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <GeneratorView />
      </main>
    </div>
  );
};

export default App;