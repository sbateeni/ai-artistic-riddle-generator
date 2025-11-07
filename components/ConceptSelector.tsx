import React from 'react';
import type { Concept } from '../types';
import ConceptCard from './ConceptCard';

interface ConceptSelectorProps {
  concepts: Concept[];
  onSelect: (concept: Concept) => void;
}

const ConceptSelector: React.FC<ConceptSelectorProps> = ({ concepts, onSelect }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">اختر طابعاً فنياً لغزك</h2>
      <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
        كل طابع فني يمثل بوابة لعالم من الألغاز البصرية. اختر واحداً لبدء صناعة تحفتك الفنية الغامضة.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {concepts.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} onSelect={() => onSelect(concept)} />
        ))}
      </div>
    </div>
  );
};

export default ConceptSelector;