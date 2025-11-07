
import React from 'react';
import type { Concept } from '../types';

interface ConceptCardProps {
  concept: Concept;
  onSelect: () => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept, onSelect }) => {
  const Icon = concept.icon;
  return (
    <div 
      className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-right hover:border-purple-400 hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={onSelect}
    >
      <div className="flex items-center mb-4">
        <div className="bg-gray-700 p-3 rounded-lg ml-4">
            <Icon className="h-6 w-6 text-purple-400" />
        </div>
        <h3 className="text-xl font-bold text-white">{concept.title}</h3>
      </div>
      <p className="text-gray-400 flex-grow">{concept.description}</p>
      <button className="mt-6 w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
        اختر هذا الطابع الفني
      </button>
    </div>
  );
};

export default ConceptCard;