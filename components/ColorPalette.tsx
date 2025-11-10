import React from 'react';
import { TONE_FAMILIES } from '../constants';
import type { Tone } from '../types';

interface ColorPaletteProps {
  currentSelection: Tone | null;
  desiredSelection: Tone | null;
  onCurrentSelect: (tone: Tone) => void;
  onDesiredSelect: (tone: Tone) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  currentSelection,
  desiredSelection,
  onCurrentSelect,
  onDesiredSelect,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center p-3 bg-gray-800 rounded-lg border border-gray-700">
        <p className="font-semibold">INSTRUCCIONES: <span className="font-normal text-gray-400">Primero, haz clic en un tono para fijar el color <span className="text-cyan-400">ACTUAL</span>. Luego, haz clic en otro para fijar el color <span className="text-amber-400">DESEADO</span>.</span></p>
      </div>
      {TONE_FAMILIES.map((family) => (
        <div key={family.name}>
          <h3 className="text-lg font-semibold tracking-wider uppercase text-gray-400 mb-3 ml-1">{family.name}</h3>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
            {family.tones.map((tone) => {
              const isCurrent = currentSelection?.code === tone.code;
              const isDesired = desiredSelection?.code === tone.code;
              let ringColor = 'ring-transparent';
              if (isCurrent && isDesired) ringColor = 'ring-pink-500';
              else if (isCurrent) ringColor = 'ring-cyan-400';
              else if (isDesired) ringColor = 'ring-amber-400';
              
              const handleClick = () => {
                if (!currentSelection || currentSelection.code === tone.code) {
                  onCurrentSelect(tone);
                } else {
                  onDesiredSelect(tone);
                }
              };

              return (
                <div key={tone.code} className="text-center cursor-pointer group" onClick={handleClick}>
                  <div
                    className={`w-14 h-14 rounded-full mx-auto border-2 border-gray-600/50 group-hover:scale-110 group-hover:shadow-lg transition-transform duration-200 ring-4 ${ringColor}`}
                    style={{ backgroundColor: tone.color }}
                  ></div>
                  <p className="text-xs mt-2 font-mono text-gray-400 group-hover:text-white">{tone.code}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPalette;