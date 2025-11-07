import React, { useState, useEffect } from 'react';
import type { ArtisticRiddle } from '../types';
import { generateImageFromRiddle } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

interface ImageGenerationModalProps {
  episode: ArtisticRiddle; // Prop name kept for stability, but it's an ArtisticRiddle
  onClose: () => void;
  isEnglish: boolean;
}

const ImageGenerationModal: React.FC<ImageGenerationModalProps> = ({ episode, onClose, isEnglish }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const generate = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const generatedImages = await generateImageFromRiddle(episode);
                if (generatedImages.length === 0) {
                    throw new Error(isEnglish ? "The model did not return any images. The prompt may have been rejected for safety reasons." : "لم يقم النموذج بإرجاع أي صور. ربما تم رفض النص لأسباب تتعلق بالسلامة.");
                }
                setImages(generatedImages);
            } catch (err: any) {
                const errorString = err.message || JSON.stringify(err);
                let friendlyErrorMessage;

                if (errorString.includes('429') || errorString.includes('RESOURCE_EXHAUSTED') || errorString.includes('Quota exceeded')) {
                    friendlyErrorMessage = isEnglish ? "You're making requests too quickly. Please wait a moment and try again." : 'لقد قمت بتقديم طلبات كثيرة جدًا بسرعة. يرجى الانتظار لحظة ثم المحاولة مرة أخرى.';
                } else {
                    friendlyErrorMessage = isEnglish ? "Failed to generate images. The model might be temporarily unavailable or the request was blocked." : "فشل في إنشاء الصور. قد يكون النموذج غير متاح مؤقتًا أو تم حظر الطلب.";
                }
                setError(friendlyErrorMessage);
            } finally {
                setIsLoading(false);
            }
        };
        generate();
    }, [episode, isEnglish]);

    const handleDownload = (base64Image: string, index: number) => {
        const link = document.createElement('a');
        link.href = `data:image/jpeg;base64,${base64Image}`;
        link.download = `${episode.title.replace(/\s/g, '_')}_R${episode.riddleNumber}_img${index + 1}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={onClose}
        >
            <div 
              className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
                <header className="p-4 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-xl font-bold text-white">{isEnglish ? "Generated Art for: " : "اللوحة الفنية المولّدة لـ: "}<span className="text-purple-400">{episode.title}</span></h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                </header>

                <main className="p-6 overflow-y-auto flex-grow">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                            <LoadingSpinner />
                            <p className="mt-4 text-lg">{isEnglish ? "Generating masterpiece with Imagen 4..." : "جاري إنشاء التحفة الفنية بواسطة Imagen 4..."}</p>
                            <p className="text-sm">{isEnglish ? "This might take a few moments." : "قد تستغرق هذه العملية لحظات."}</p>
                        </div>
                    )}
                    {error && (
                        <div className="flex items-center justify-center h-full text-center text-red-400 bg-red-900/20 rounded-lg p-4">
                            <div>
                                <h3 className="font-bold text-lg">{isEnglish ? "An Error Occurred" : "حدث خطأ"}</h3>
                                <p className="text-sm mt-2">{error}</p>
                            </div>
                        </div>
                    )}
                    {!isLoading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {images.map((base64Image, index) => (
                                <div key={index} className="group relative rounded-lg overflow-hidden border-2 border-transparent hover:border-cyan-500 transition-all">
                                    <img 
                                      src={`data:image/jpeg;base64,${base64Image}`} 
                                      alt={`Generated image ${index + 1} for ${episode.title}`}
                                      className="w-full h-full object-cover" 
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={() => handleDownload(base64Image, index)}
                                            className="flex items-center justify-center px-4 py-2 text-md font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                                            {isEnglish ? "Download" : "تحميل"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                <footer className="p-4 border-t border-gray-700 mt-auto flex-shrink-0">
                    <button onClick={onClose} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        {isEnglish ? "Close" : "إغلاق"}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ImageGenerationModal;