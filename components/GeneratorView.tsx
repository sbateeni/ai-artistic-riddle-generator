import React, { useState, useEffect } from 'react';
import type { Concept, ArtisticRiddle } from '../types';
import { CONCEPTS } from '../constants';
import { generateRiddle, getStoredData, saveStoredData, improveRiddleDescription } from '../services/geminiService';
import ConceptSelector from './ConceptSelector';
import EpisodeDisplay from './EpisodeDisplay';
import LoadingSpinner from './LoadingSpinner';
import ImageGenerationModal from './ImageGenerationModal';

const GeneratorView: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [riddles, setRiddles] = useState<ArtisticRiddle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImprovingId, setIsImprovingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatingImagesForRiddle, setGeneratingImagesForRiddle] = useState<ArtisticRiddle | null>(null);
  
  useEffect(() => {
    if (selectedConcept) {
      const data = getStoredData();
      setRiddles(data[selectedConcept.id] || []);
    }
  }, [selectedConcept]);

  const handleSelectConcept = (concept: Concept) => {
    setSelectedConcept(concept);
  };

  const handleGenerateNextRiddle = async () => {
    if (!selectedConcept) return;

    setIsLoading(true);
    setError(null);
    const isEnglish = /[a-zA-Z]/.test(selectedConcept.title);
    try {
      const newRiddle = await generateRiddle(selectedConcept, riddles);
      const updatedRiddles = [...riddles, newRiddle];
      setRiddles(updatedRiddles);

      // Save to local storage
      const data = getStoredData();
      data[selectedConcept.id] = updatedRiddles;
      saveStoredData(data);
    } catch (err: any) {
      const errorString = err.message || JSON.stringify(err);
      let friendlyErrorMessage;

      if (errorString.includes('429') || errorString.includes('RESOURCE_EXHAUSTED') || errorString.includes('Quota exceeded')) {
        friendlyErrorMessage = isEnglish
          ? "You're making requests too quickly. Please wait a moment and try again."
          : 'لقد قمت بتقديم طلبات كثيرة جدًا بسرعة. يرجى الانتظار لحظة ثم المحاولة مرة أخرى.';
      } else {
         friendlyErrorMessage = isEnglish
            ? 'Failed to generate a new riddle concept. The model might be temporarily unavailable or the request was blocked.'
            : 'فشل في إنشاء مفهوم لغز جديد. قد يكون النموذج غير متاح مؤقتًا أو تم حظر الطلب.';
      }
      setError(friendlyErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImproveDescription = async (riddleToImprove: ArtisticRiddle) => {
    if (!selectedConcept) return;

    setIsImprovingId(riddleToImprove.riddleNumber);
    setError(null);

    try {
      const improvedDescription = await improveRiddleDescription(riddleToImprove.description);
      
      const updatedRiddles = riddles.map(r => 
        r.riddleNumber === riddleToImprove.riddleNumber 
          ? { ...r, description: improvedDescription } 
          : r
      );
      
      setRiddles(updatedRiddles);

      // Save to local storage
      const data = getStoredData();
      data[selectedConcept.id] = updatedRiddles;
      saveStoredData(data);

    } catch (err: any) {
       const isEnglish = /[a-zA-Z]/.test(selectedConcept.title);
       const errorString = err.message || JSON.stringify(err);
       let friendlyErrorMessage;

       if (errorString.includes('429') || errorString.includes('RESOURCE_EXHAUSTED') || errorString.includes('Quota exceeded')) {
         friendlyErrorMessage = isEnglish
           ? "You're making requests too quickly. Please wait a moment and try again."
           : 'لقد قمت بتقديم طلبات كثيرة جدًا بسرعة. يرجى الانتظار لحظة ثم المحاولة مرة أخرى.';
       } else {
          friendlyErrorMessage = isEnglish
             ? 'Failed to improve the description.'
             : 'فشل في تحسين الوصف.';
       }
       setError(friendlyErrorMessage);
    } finally {
      setIsImprovingId(null);
    }
  };
  
  const handleStartImageGeneration = (riddle: ArtisticRiddle) => {
    setGeneratingImagesForRiddle(riddle);
  };

  const handleCloseModal = () => {
    setGeneratingImagesForRiddle(null);
  };

  const handleReset = () => {
    setSelectedConcept(null);
    setRiddles([]);
    setError(null);
  };

  if (!selectedConcept) {
    return <ConceptSelector concepts={CONCEPTS} onSelect={handleSelectConcept} />;
  }

  const isEnglish = /[a-zA-Z]/.test(selectedConcept.title);
  const dir = isEnglish ? 'ltr' : 'rtl';

  return (
    <div className="animate-fade-in" dir={dir}>
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8 text-center md:text-right rtl:md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <p className="text-sm text-purple-400">{isEnglish ? "Selected Theme" : "الطابع الفني المختار"}</p>
                <h2 className="text-2xl font-bold">{selectedConcept.title}</h2>
                <p className="text-gray-400 max-w-2xl">{selectedConcept.description}</p>
            </div>
            <button onClick={handleReset} className="mt-4 md:mt-0 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors flex-shrink-0">
              {isEnglish ? "Choose Another Theme" : "اختر طابعًا آخر"}
            </button>
        </div>
      </div>

      <div className="space-y-6">
        {riddles.map((riddle) => (
          <EpisodeDisplay 
            key={riddle.riddleNumber} 
            episode={riddle} 
            onStartImageGeneration={handleStartImageGeneration}
            onImproveDescription={handleImproveDescription}
            isImproving={isImprovingId === riddle.riddleNumber}
          />
        )).reverse()}
      </div>

      {error && (
        <div className="my-4 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
          <p><strong>{isEnglish ? "Action Failed:" : "فشل الإجراء:"}</strong> {error}</p>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={handleGenerateNextRiddle}
          disabled={isLoading}
          className="w-full md:w-auto px-8 py-4 text-lg font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              {isEnglish ? `Generating Riddle #${riddles.length + 1}...` : `جاري إنشاء اللغز #${riddles.length + 1}...`}
            </>
          ) : (
            `${isEnglish ? `Generate Riddle #${riddles.length + 1}` : `أنشئ اللغز #${riddles.length + 1}`}`
          )}
        </button>
      </div>

      {generatingImagesForRiddle && (
        <ImageGenerationModal 
          episode={generatingImagesForRiddle} 
          onClose={handleCloseModal}
          isEnglish={isEnglish}
        />
      )}
    </div>
  );
};

export default GeneratorView;