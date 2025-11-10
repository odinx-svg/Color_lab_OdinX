export interface Tone {
  code: string;
  color: string;
  name: string;
}

export interface MixedTone {
  tone: Tone;
  grams: number;
}

export interface ToneFamily {
  name: string;
  tones: Tone[];
}

export interface FormulaTone {
  tone: string;
  grams: number;
}

export interface Developer {
  volume: number;
  ratio: string;
  oxidant_grams: number;
}

export interface EstimatedResult {
  hex_color: string;
  description: string;
}

export interface FormulaResponse {
  estimated_result: EstimatedResult;
  formula: {
    tones: FormulaTone[];
    developer: Developer;
    processing_time: string;
    notes: string;
  };
}

export interface PlaygroundResponse {
  estimated_result: EstimatedResult;
  dominant_reflex: string;
  undertone_movement: string;
  neutralization_warning: string;
}

export interface VisualFormulaInput {
    current: Tone;
    desired: Tone;
    gray: string;
    condition: string;
}