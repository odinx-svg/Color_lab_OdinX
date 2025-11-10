import React, { useState } from 'react';
import { TONE_FAMILIES } from '../constants';
import type { Tone, MixedTone } from '../types';

interface PlaygroundProps {
    onAnalyze: (mix: MixedTone[], base: Tone | null) => void;
    isLoading: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ onAnalyze, isLoading }) => {
    const [baseColor, setBaseColor] = useState<Tone | null>(null);
    const [mixedTones, setMixedTones] = useState<MixedTone[]>([]);
    
    const [isOverBase, setIsOverBase] = useState(false);
    const [isOverMix, setIsOverMix] = useState(false);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, tone: Tone) => {
        e.dataTransfer.setData('application/json', JSON.stringify(tone));
    };

    const handleDropOnBase = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOverBase(false);
        const toneData = e.dataTransfer.getData('application/json');
        if (toneData) {
            setBaseColor(JSON.parse(toneData));
        }
    };
    
    const handleDropOnMix = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsOverMix(false);
        const toneData = e.dataTransfer.getData('application/json');
        if (toneData) {
            const tone: Tone = JSON.parse(toneData);
            if (!mixedTones.some(item => item.tone.code === tone.code)) {
                setMixedTones(prev => [...prev, { tone, grams: 30 }]);
            }
        }
    };

    const handleGramsChange = (code: string, newGrams: number) => {
        setMixedTones(prev => prev.map(item => 
            item.tone.code === code ? { ...item, grams: isNaN(newGrams) ? 0 : newGrams } : item
        ));
    };

    const handleRemove = (code: string) => {
        setMixedTones(prev => prev.filter(item => item.tone.code !== code));
    };

    const handleClear = () => {
        setMixedTones([]);
        setBaseColor(null);
    };
    
    return (
        <div className="w-full mx-auto animate-fade-in">
            {/* Mixing Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                {/* Base Color Dropzone */}
                <div className="flex flex-col items-center">
                    <h4 className="font-semibold text-lg text-gray-300 mb-2">1. Color Base del Cliente</h4>
                    <div 
                        onDrop={handleDropOnBase}
                        onDragOver={(e) => { e.preventDefault(); setIsOverBase(true); }}
                        onDragLeave={() => setIsOverBase(false)}
                        className={`w-40 h-40 rounded-full flex items-center justify-center text-center p-2 border-2 border-dashed ${isOverBase ? 'border-pink-500' : 'border-gray-600'} transition-colors duration-300`}
                        style={{ backgroundColor: baseColor?.color || 'transparent' }}
                    >
                        {!baseColor && <span className="text-gray-500 text-sm">Arrastra un tono aquí</span>}
                    </div>
                    {baseColor && (
                        <div className="text-center mt-2">
                            <p className="font-mono">{baseColor.code}</p>
                            <p className="text-xs text-gray-400">{baseColor.name}</p>
                            <button onClick={() => setBaseColor(null)} className="text-xs text-red-400 hover:text-red-300 mt-1">Quitar</button>
                        </div>
                    )}
                </div>

                {/* Formula Dropzone */}
                <div className="flex flex-col">
                    <h4 className="font-semibold text-lg text-gray-300 mb-2">2. Recipiente de Mezcla</h4>
                    <div
                        onDrop={handleDropOnMix}
                        onDragOver={(e) => { e.preventDefault(); setIsOverMix(true); }}
                        onDragLeave={() => setIsOverMix(false)}
                        className={`flex-grow min-h-[160px] p-3 bg-gray-900/50 rounded-lg border-2 border-dashed ${isOverMix ? 'border-cyan-400' : 'border-gray-600'} transition-colors duration-300`}
                    >
                        {mixedTones.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <p>Arrastra tonos de la fórmula aquí</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {mixedTones.map(({ tone, grams }) => (
                                    <div key={tone.code} className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg animate-fade-in-short">
                                        <div className="w-6 h-6 rounded-full border border-gray-500" style={{backgroundColor: tone.color}}></div>
                                        <span className="font-mono text-sm w-16">{tone.code}</span>
                                        <input 
                                            type="number" 
                                            value={grams}
                                            onChange={(e) => handleGramsChange(tone.code, parseInt(e.target.value, 10))}
                                            className="w-16 text-center bg-gray-800 border border-gray-600 rounded-md p-1"
                                            step="5"
                                            min="0"
                                        />
                                        <span className="text-gray-400 text-sm">g</span>
                                        <button onClick={() => handleRemove(tone.code)} className="ml-auto text-red-400 hover:text-red-300 text-xl font-bold">&times;</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
                <button 
                    onClick={() => onAnalyze(mixedTones, baseColor)} 
                    disabled={mixedTones.length === 0 || !baseColor || isLoading}
                    className="px-8 py-3 font-semibold rounded-lg text-white bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 disabled:opacity-50"
                >
                    Analizar Mezcla
                </button>
                <button 
                    onClick={handleClear} 
                    disabled={(mixedTones.length === 0 && !baseColor) || isLoading}
                    className="px-6 py-3 font-semibold rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                >
                    Limpiar Todo
                </button>
            </div>

            {/* Color Palette */}
            <div className="mt-10 space-y-6">
                <p className="text-center text-gray-400">Arrastra desde la paleta hacia las zonas de mezcla de arriba.</p>
                {TONE_FAMILIES.map((family) => (
                    <div key={family.name}>
                    <h3 className="text-lg font-semibold tracking-wider uppercase text-gray-400 mb-3 ml-1">{family.name}</h3>
                    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                        {family.tones.map((tone) => (
                        <div 
                            key={tone.code} 
                            className="text-center cursor-grab group" 
                            draggable 
                            onDragStart={(e) => handleDragStart(e, tone)}
                        >
                            <div
                                className="w-14 h-14 rounded-full mx-auto border-2 border-gray-600/50 group-hover:scale-110 group-hover:shadow-lg transition-transform duration-200"
                                style={{ backgroundColor: tone.color }}
                            ></div>
                            <p className="text-xs mt-2 font-mono text-gray-400 group-hover:text-white">{tone.code}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Playground;