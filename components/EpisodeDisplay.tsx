import React, { useState } from 'react';
import type { ArtisticRiddle } from '../types';

interface RiddleDisplayProps {
  episode: ArtisticRiddle;
  onStartImageGeneration: (riddle: ArtisticRiddle) => void;
  onImproveDescription: (riddle: ArtisticRiddle) => void;
  isImproving: boolean;
}

const RiddleDisplay: React.FC<RiddleDisplayProps> = ({ episode, onStartImageGeneration, onImproveDescription, isImproving }) => {
  const [showSolution, setShowSolution] = useState(false);
  const isEnglish = /[a-zA-Z]/.test(episode.title);
  const dir = isEnglish ? 'ltr' : 'rtl';
  
  const smallSpinner = (
    <svg className="animate-spin h-4 w-4 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div dir={dir} className="bg-gray-800/40 border border-gray-700 rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 bg-gray-800 flex justify-between items-center">
        <h3 className="text-2xl font-bold">
          <span className="text-purple-400 mr-3 rtl:mr-0 rtl:ml-3">{isEnglish ? `Riddle #${episode.riddleNumber}:` : `اللغز #${episode.riddleNumber}:`}</span>
          {episode.title}
        </h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Artistic Description Section */}
        <div className="border-r-4 border-purple-500 pr-4 rtl:border-r-0 rtl:border-l-4 rtl:pr-0 rtl:pl-4">
          <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold text-purple-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2 rtl:ml-0 rtl:mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5ZM16.5 7.5h.008v.008h-.008V7.5Z" />
                </svg>
                {isEnglish ? "Artistic Description" : "الوصف الفني للوحة"}
              </h4>
              <button
                  onClick={() => onImproveDescription(episode)}
                  disabled={isImproving}
                  className="flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50 disabled:cursor-wait transition-colors px-2 py-1 rounded-md hover:bg-purple-900/50"
                  title={isEnglish ? "Improve with AI" : "تحسين بالذكاء الاصطناعي"}
              >
                  {isImproving ? (
                      <>
                          {smallSpinner}
                          <span className="italic">{isEnglish ? "Improving..." : "جاري التحسين..."}</span>
                      </>
                  ) : (
                      <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                          </svg>
                          <span>{isEnglish ? "Improve" : "تحسين"}</span>
                      </>
                  )}
              </button>
          </div>
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{episode.description}</p>
        </div>

        {/* Solution Section (Collapsible) */}
        <div>
          <button 
            onClick={() => setShowSolution(!showSolution)}
            className="w-full text-left font-semibold text-green-400 mb-2 flex items-center hover:text-green-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 transition-transform duration-300 ${showSolution ? 'rotate-90' : ''}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            {isEnglish ? "Reveal Solution" : "اكتشف حل اللغز"}
          </button>
          {showSolution && (
             <div className="border-r-4 border-green-500 pr-4 rtl:border-r-0 rtl:border-l-4 rtl:pr-0 rtl:pl-4 animate-fade-in">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed bg-gray-900/50 p-3 rounded-md">{episode.solution}</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-gray-800/50 border-t border-gray-700">
        <button 
          onClick={() => onStartImageGeneration(episode)}
          className="w-full flex items-center justify-center px-4 py-2 text-md font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
          {isEnglish ? "Generate Masterpiece" : "حوّل الوصف إلى تحفة فنية"}
        </button>
      </div>
    </div>
  );
};

export default RiddleDisplay;