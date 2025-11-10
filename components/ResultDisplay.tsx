import React from 'react';
import type { FormulaResponse, PlaygroundResponse } from '../types';

interface ResultDisplayProps {
  result: FormulaResponse | PlaygroundResponse;
  isPlayground: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isPlayground }) => {
  if (isPlayground) {
    return <PlaygroundView response={result as PlaygroundResponse} />;
  }
  return <FormulaView response={result as FormulaResponse} />;
};

const FormulaView: React.FC<{ response: FormulaResponse }> = ({ response }) => (
  <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg w-full max-w-4xl mx-auto animate-fade-in">
    <div className="p-6">
      <h3 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-500 mb-6">Fórmula Generada y Previsualización</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
          <h4 className="font-semibold text-lg mb-3 text-gray-300">Resultado Estimado</h4>
          <div 
            className="w-40 h-40 rounded-full mx-auto border-4 border-gray-600 shadow-lg"
            style={{ backgroundColor: response.estimated_result.hex_color }}
          ></div>
          <p className="mt-4 text-gray-400 italic">"{response.estimated_result.description}"</p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3 text-gray-300">Detalles de la Fórmula</h4>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-pink-400">Tonos:</p>
              <ul className="list-disc list-inside text-gray-300">
                {response.formula.tones.map(t => <li key={t.tone}>{`${t.grams}g ${t.tone}`}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-medium text-pink-400">Oxidante:</p>
              <p className="text-gray-300">{`${response.formula.developer.oxidant_grams}g de ${response.formula.developer.volume}vol (Proporción: ${response.formula.developer.ratio})`}</p>
            </div>
            <div>
              <p className="font-medium text-pink-400">Tiempo de Exposición:</p>
              <p className="text-gray-300">{response.formula.processing_time}</p>
            </div>
            <div>
              <p className="font-medium text-pink-400">Notas y Guía:</p>
              <p className="text-gray-400">{response.formula.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PlaygroundView: React.FC<{ response: PlaygroundResponse }> = ({ response }) => (
  <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg w-full max-w-4xl mx-auto animate-fade-in">
    <div className="p-6">
      <h3 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-500 mb-6">Análisis del Playground</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
                <h4 className="font-semibold text-lg mb-3 text-gray-300">Resultado Estimado de la Mezcla</h4>
                 <div 
                    className="w-40 h-40 rounded-full mx-auto border-4 border-gray-600 shadow-lg"
                    style={{ backgroundColor: response.estimated_result.hex_color }}
                ></div>
                <p className="mt-4 text-gray-400 italic">"{response.estimated_result.description}"</p>
            </div>
            <div className="space-y-3">
                 <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="font-semibold text-pink-400">Reflejo Dominante:</p>
                    <p className="text-gray-300">{response.dominant_reflex}</p>
                </div>
                 <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="font-semibold text-pink-400">Tendencia del Fondo:</p>
                    <p className="text-gray-300">{response.undertone_movement}</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="font-semibold text-pink-400">Aviso de Neutralización:</p>
                    <p className="text-gray-300">{response.neutralization_warning}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
);

export default ResultDisplay;