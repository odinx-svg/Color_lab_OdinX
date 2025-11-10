import { GoogleGenAI } from '@google/genai';
import type { FormulaResponse, PlaygroundResponse, VisualFormulaInput, MixedTone, Tone } from '../types';

const MODEL_NAME = 'gemini-2.5-pro';

const getBasePrompt = () => `
Eres "OdinX Color Lab", un asistente profesional de formulación de color de cabello de clase mundial, especializado en el sistema de color CAV Professional. Tu propósito es ayudar a los estilistas generando fórmulas precisas basadas en selecciones visuales.

DEBES usar SIEMPRE y ÚNICAMENTE los tonos que existen en el catálogo de CAV. Aquí está la lista completa:
- NATURALES: 1, 3, 4, 5, 6, 7, 8, 9, 10, 11.0
- CENIZAS / IRISADOS: 11.1, 11.2, 10.1, 9.1, 9.21, 9.2, 8.1, 8.21, 7.1, 7.21, 7.2, 6.1, 5.1, 5.22
- DORADOS: 9.3, 8.3, 7.3, 7.34, 6.3, 6.34, 5.3
- COBRIZOS: 7.44, 7.43, 6.46, 6.43, 5.4
- ROJIZOS: 7.62, 6.60, 5.62, 5.6, 5.46, 4.5
- MOKA / MARRONES: 8.31, 8.23, 7.7, 7.17, 6.7, 6.5, 6.21, 6.17, 5.7
- ESPECIALES / CORRECTORES: Red, Blue, Yellow, Violet, Perla

REGLAS:
1.  Nunca inventes tonos. Cíñete a la lista proporcionada.
2.  Las fórmulas deben ser en gramos.
3.  Especifica el volumen del oxidante (10, 20, 30, 40 vol) según las necesidades de aclaración/depósito.
4.  La proporción de mezcla estándar es 1+1.5 (ej: 40g de color + 60g de oxidante).
5.  Usa la lógica del círculo cromático para la neutralización (Azul para naranja, Violeta para amarillo).
6.  Tu respuesta DEBE SER un único objeto JSON válido y sin formato. Sin explicaciones, sin markdown.
`;

const parseJsonResponse = <T,>(text: string): T => {
  try {
    const cleanText = text.replace(/^```json\s*|```\s*$/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Fallo al parsear JSON:", text, error);
    throw new Error("Respuesta JSON inválida de la API. El modelo devolvió una respuesta no JSON o mal formada.");
  }
};

export const generateVisualFormula = async (ai: GoogleGenAI, input: VisualFormulaInput): Promise<FormulaResponse> => {
  const systemInstruction = `
    ${getBasePrompt()}
    La estructura de salida JSON DEBE SER:
    {
      "estimated_result": {
        "hex_color": "string (ej: #B5651D)",
        "description": "string (ej: Cobre dorado cálido con suave profundidad roja)"
      },
      "formula": {
        "tones": [
          {"tone": "string", "grams": number}
        ],
        "developer": {
          "volume": number,
          "ratio": "1+1.5",
          "oxidant_grams": number
        },
        "processing_time": "string (ej: 30-45min)",
        "notes": "string (Proporciona aquí guías de neutralización o intensificación)"
      }
    }
  `;

  const userPrompt = `
    Genera una fórmula de color de cabello basada en estas selecciones:
    - Cabello actual: nivel/tono ${input.current.code} (${input.current.name})
    - Cabello final deseado: nivel/tono ${input.desired.code} (${input.desired.name})
    - Porcentaje de canas: ${input.gray}
    - Condición del cabello: ${input.condition}

    Calcula la aclaración necesaria, considera el fondo de aclaración natural en el nivel de partida y selecciona el oxidante apropiado. Formula la mezcla de color para alcanzar el tono deseado, neutralizando cualquier calidez no deseada si es necesario. Además, proporciona un color hexadecimal y una breve descripción para una vista previa visual del resultado estimado.
  `;
  
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: userPrompt,
    config: { systemInstruction }
  });

  return parseJsonResponse<FormulaResponse>(response.text);
};

export const analyzePlayground = async (ai: GoogleGenAI, mix: MixedTone[], base: Tone): Promise<PlaygroundResponse> => {
  const systemInstruction = `
    Eres el analista de OdinX Color Lab. Tu rol es analizar una mezcla de color de cabello introducida manualmente de la línea CAV Professional y describir el resultado probable, incluyendo una simulación visual. La mezcla se aplica sobre un color base ya existente.
    Tu respuesta debe ser ÚNICAMENTE un solo objeto JSON válido y sin formato. Sin texto extra ni markdown.
    La estructura JSON DEBE SER:
    {
      "estimated_result": {
        "hex_color": "string (ej: #C57544)",
        "description": "string (ej: Un cobre rojizo vibrante y cálido a una altura 7)"
      },
      "dominant_reflex": "string (ej: .46 Cobre-Rojizo)",
      "undertone_movement": "string (ej: La mezcla potencia fuertemente la calidez y la vitalidad sobre la base existente)",
      "neutralization_warning": "string (ej: Esta fórmula es para añadir calidez, no para neutralizar. Para reducir la calidez, considera añadir un tono de la serie .1)"
    }
  `;
  
  const mixString = mix.map(m => `${m.grams}g de ${m.tone.code}`).join(' + ');
  const userPrompt = `Analiza el resultado de aplicar la siguiente fórmula: "${mixString}" sobre un cabello con el color base: "${base.code} (${base.name})". Considera el color base como el punto de partida, calcula cómo la fórmula lo alterará y describe el resultado final.`;
  
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: userPrompt,
    config: { systemInstruction }
  });

  return parseJsonResponse<PlaygroundResponse>(response.text);
};