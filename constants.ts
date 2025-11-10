import type { ToneFamily } from './types';

export const TONE_FAMILIES: ToneFamily[] = [
  {
    name: 'NATURALES',
    tones: [
      { code: '1', color: '#100F0F', name: 'Negro' },
      { code: '3', color: '#2D221E', name: 'Castaño Oscuro' },
      { code: '4', color: '#3E2A21', name: 'Castaño' },
      { code: '5', color: '#4C3528', name: 'Castaño Claro' },
      { code: '6', color: '#5D4233', name: 'Rubio Oscuro' },
      { code: '7', color: '#7E5B43', name: 'Rubio' },
      { code: '8', color: '#A37F5B', name: 'Rubio Claro' },
      { code: '9', color: '#D2A877', name: 'Rubio Muy Claro' },
      { code: '10', color: '#E8C395', name: 'Rubio Extra Claro' },
      { code: '11.0', color: '#F0D4AA', name: 'Super Aclarante Natural' },
    ],
  },
  {
    name: 'CENIZAS / IRISADOS',
    tones: [
      { code: '11.1', color: '#E2D0B9', name: 'Super Aclarante Ceniza' },
      { code: '11.2', color: '#E3CDBE', name: 'Super Aclarante Irisado' },
      { code: '10.1', color: '#D9C5B0', name: 'Rubio Extra Claro Ceniza' },
      { code: '9.1', color: '#C1AB95', name: 'Rubio Muy Claro Ceniza' },
      { code: '9.21', color: '#BFAFB0', name: 'Rubio Muy Claro Irisado Ceniza' },
      { code: '9.2', color: '#C0AAB1', name: 'Rubio Muy Claro Irisado' },
      { code: '8.1', color: '#A99480', name: 'Rubio Claro Ceniza' },
      { code: '8.21', color: '#A49697', name: 'Rubio Claro Irisado Ceniza' },
      { code: '7.1', color: '#907D6B', name: 'Rubio Ceniza' },
      { code: '7.21', color: '#8F7F81', name: 'Rubio Irisado Ceniza' },
      { code: '7.2', color: '#8C7781', name: 'Rubio Irisado' },
      { code: '6.1', color: '#746253', name: 'Rubio Oscuro Ceniza' },
      { code: '5.1', color: '#5A4A40', name: 'Castaño Claro Ceniza' },
      { code: '5.22', color: '#5A3F50', name: 'Violeta Indigo' },
    ],
  },
  {
    name: 'DORADOS',
    tones: [
      { code: '9.3', color: '#DCC389', name: 'Rubio Muy Claro Dorado' },
      { code: '8.3', color: '#C9A96B', name: 'Rubio Claro Dorado' },
      { code: '7.3', color: '#B79553', name: 'Rubio Dorado' },
      { code: '7.34', color: '#B68B57', name: 'Rubio Dorado Cobrizo' },
      { code: '6.3', color: '#9F7C45', name: 'Rubio Oscuro Dorado' },
      { code: '6.34', color: '#9A7045', name: 'Rubio Oscuro Dorado Cobrizo' },
      { code: '5.3', color: '#755836', name: 'Castaño Claro Dorado' },
    ],
  },
  {
    name: 'COBRIZOS',
    tones: [
      { code: '7.44', color: '#D98347', name: 'Rubio Cobrizo Intenso' },
      { code: '7.43', color: '#C88752', name: 'Rubio Cobrizo Dorado' },
      { code: '6.46', color: '#B96147', name: 'Rubio Oscuro Cobrizo Rojizo' },
      { code: '6.43', color: '#B57E52', name: 'Rubio Oscuro Cobrizo Dorado' },
      { code: '5.4', color: '#935639', name: 'Castaño Claro Cobrizo' },
    ],
  },
  {
    name: 'ROJIZOS',
    tones: [
      { code: '7.62', color: '#A95260', name: 'Rojo Borgoña' },
      { code: '6.60', color: '#B0413D', name: 'Rojo Intenso' },
      { code: '5.62', color: '#793B4A', name: 'Rojo Borgoña Oscuro' },
      { code: '5.6', color: '#96413C', name: 'Rojo Caoba' },
      { code: '5.46', color: '#A04D41', name: 'Rojo Cobrizo' },
      { code: '4.5', color: '#5E343A', name: 'Caoba' },
    ],
  },
  {
    name: 'MOKA / MARRONES',
    tones: [
      { code: '8.31', color: '#B09A7F', name: 'Beige' },
      { code: '8.23', color: '#A99480', name: 'Marron Nacarado' },
      { code: '7.7', color: '#7D695A', name: 'Natural Profundo' },
      { code: '7.17', color: '#817163', name: 'Natural Profundo' },
      { code: '6.7', color: '#68564A', name: 'Natural Profundo' },
      { code: '6.5', color: '#664A45', name: 'Marrón' },
      { code: '6.21', color: '#706461', name: 'Ceniza Profundo' },
      { code: '6.17', color: '#6A5C51', name: 'Natural Profundo' },
      { code: '5.7', color: '#56473E', name: 'Natural Profundo' },
    ],
  },
  {
    name: 'ESPECIALES / CORRECTORES',
    tones: [
      { code: 'Red', color: '#E53E3E', name: 'Rojo' },
      { code: 'Blue', color: '#3B82F6', name: 'Azul' },
      { code: 'Yellow', color: '#FBBF24', name: 'Amarillo' },
      { code: 'Violet', color: '#8B5CF6', name: 'Violeta' },
      { code: 'Perla', color: '#CAD1D8', name: 'Perla' },
    ],
  },
];


export const CONDICIONES_CABELLO = [
  'Sano',
  'Poroso',
  'Decolorado',
  'Dañado'
];

export const PORCENTAJES_CANAS = [
    '0%', '1-25%', '26-50%', '51-75%', '76-100%'
];