import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { generateVisualFormula, analyzePlayground } from './services/geminiService';
import type { FormulaResponse, PlaygroundResponse, Tone, MixedTone } from './types';
import { PORCENTAJES_CANAS, CONDICIONES_CABELLO } from './constants';

import Header from './components/Header';
import ColorPalette from './components/ColorPalette';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import Playground from './components/Playground';

const App: React.FC = () => {
  const [currentSelection, setCurrentSelection] = useState<Tone | null>(null);
  const [desiredSelection, setDesiredSelection] = useState<Tone | null>(null);
  const [grayPercentage, setGrayPercentage] = useState<string>(PORCENTAJES_CANAS[0]);
  const [hairCondition, setHairCondition] = useState<string>(CONDICIONES_CABELLO[0]);
  
  const [result, setResult] = useState<FormulaResponse | PlaygroundResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isPlayground, setIsPlayground] = useState(false);

  const resetState = () => {
    setError(null);
    setResult(null);
    setIsLoading(true);
  };

  const handleFormulaGeneration = useCallback(async () => {
    if (!currentSelection || !desiredSelection) return;
    
    resetState();
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const formulaResult = await generateVisualFormula(ai, {
        current: currentSelection,
        desired: desiredSelection,
        gray: grayPercentage,
        condition: hairCondition
      });
      setResult(formulaResult);
    } catch (e) {
      console.error(e);
      setError('No se pudo generar la fórmula. El modelo devolvió un formato inesperado.');
    } finally {
      setIsLoading(false);
    }
  }, [currentSelection, desiredSelection, grayPercentage, hairCondition]);

  const handlePlaygroundSubmit = useCallback(async (mix: MixedTone[], base: Tone | null) => {
    if (mix.length === 0 || !base) {
      setError('Por favor, establece un color base y añade al menos un tono a la fórmula para analizar.');
      return;
    }
    
    resetState();
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const playgroundResult = await analyzePlayground(ai, mix, base);
        setResult(playgroundResult);
    } catch (e) {
        console.error(e);
        setError('No se pudo analizar la mezcla. Por favor, revisa tu selección.');
    } finally {
        setIsLoading(false);
    }
  }, []);

  const allSelectionsMade = currentSelection && desiredSelection;

  return (
    <div className="min-h-screen text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        
        <div className="text-center my-6">
            <button
                onClick={() => {
                  setIsPlayground(!isPlayground);
                  setResult(null);
                  setError(null);
                }}
                className="px-6 py-2 border border-violet-500 text-violet-400 rounded-full hover:bg-violet-500 hover:text-white transition-colors duration-300"
            >
                {isPlayground ? 'Ir al Laboratorio Visual' : 'Ir al Playground Interactivo'}
            </button>
        </div>

        {isPlayground ? (
            <Playground 
              onAnalyze={handlePlaygroundSubmit}
              isLoading={isLoading}
            />
        ) : (
            <>
                <ColorPalette
                    currentSelection={currentSelection}
                    desiredSelection={desiredSelection}
                    onCurrentSelect={setCurrentSelection}
                    onDesiredSelect={setDesiredSelection}
                />

                <div className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <div className="flex space-x-4">
                            <SelectionDisplay title="Actual" selection={currentSelection} />
                            <SelectionDisplay title="Deseado" selection={desiredSelection} />
                        </div>

                        <div className="flex space-x-4">
                            <SelectInput label="% de canas" value={grayPercentage} onChange={setGrayPercentage} options={PORCENTAJES_CANAS} />
                            <SelectInput label="Estado del cabello" value={hairCondition} onChange={setHairCondition} options={CONDICIONES_CABELLO} />
                        </div>
                        
                        <button 
                            onClick={handleFormulaGeneration} 
                            disabled={!allSelectionsMade || isLoading}
                            className="w-full px-6 py-3 font-semibold rounded-lg text-white bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                        >
                            Generar Fórmula
                        </button>
                    </div>
                </div>
            </>
        )}

        {isLoading && <Loader />}
        
        {error && !isLoading && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg w-full max-w-3xl mx-auto" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {result && !isLoading && <ResultDisplay result={result} isPlayground={isPlayground} />}

        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} OdinX Color Lab. Para uso profesional exclusivo.</p>
        </footer>
      </div>
    </div>
  );
};

const SelectionDisplay = ({ title, selection }: { title: string, selection: Tone | null }) => (
    <div className="text-center">
        <p className="text-sm font-medium text-gray-400 mb-2">{title}</p>
        <div 
            className="w-16 h-16 rounded-full mx-auto border-2 border-gray-600 flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: selection?.color || '#2d3748' }}
        >
            {selection ? '' : '?'}
        </div>
        <p className="text-xs mt-2 font-mono">{selection?.code || '...'}</p>
    </div>
);

const SelectInput = ({ label, value, onChange, options }: { label: string, value: string, onChange: (val: string) => void, options: string[] }) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);


export default App;