export const MECHANISMS = [
  { value: "auto", label: "Auto", description: "Systém vybere nejlepší" },
  { value: "hyperbola", label: "Hyperbola", description: "Přehánění do absurdity" },
  { value: "inverze", label: "Inverze", description: "Prohození rolí/kauzality" },
  { value: "destrukce", label: "Destrukce", description: "Odstranění očekávaného" },
  { value: "juxtapozice", label: "Juxtapozice", description: "Nekompatibilní vedle sebe" },
  { value: "literalizace", label: "Literalizace", description: "Metafora doslova" },
  { value: "redukce", label: "Redukce", description: "Vznešené → banální" },
  { value: "misdirection", label: "Misdirection", description: "Setup jinam než punchline" },
  { value: "eskalace", label: "Eskalace", description: "Progresivní absurdita" },
] as const;

export const TONES = [
  { value: "auto", label: "Auto", description: "Systém vybere nejlepší" },
  { value: "straight", label: "Straight", description: "Přímé konstatování" },
  { value: "ironie", label: "Ironie", description: "Říká opak toho co myslí" },
  { value: "sarkasmus", label: "Sarkasmus", description: "Ostrá ironie s terčem" },
  { value: "deadpan", label: "Deadpan", description: "Suché konstatování" },
  { value: "naivni", label: "Naivní", description: "Předstíraná nevinnost" },
] as const;

export const FORMS = [
  { value: "auto", label: "Auto", description: "Systém vybere nejlepší" },
  { value: "oneliner", label: "Oneliner", description: "Jedna věta" },
  { value: "anekdota", label: "Anekdota", description: "Krátký příběh s pointou" },
  { value: "bajka", label: "Bajka", description: "Alegorický příběh" },
  { value: "parodie", label: "Parodie", description: "Napodobení žánru" },
  { value: "dialog", label: "Dialog", description: "Dva hlasy" },
  { value: "seznam", label: "Seznam", description: "Progresivní body" },
] as const;

export const SCALES = [
  { value: "mild", label: "Mild", description: "Jemné, úsměv" },
  { value: "medium", label: "Medium", description: "Jasné porušení, smích" },
  { value: "sharp", label: "Sharp", description: "Hraniční, ostré" },
  { value: "dark", label: "Dark", description: "Maximální, kontroverzní" },
] as const;

export type Mechanism = (typeof MECHANISMS)[number]["value"];
export type Tone = (typeof TONES)[number]["value"];
export type Form = (typeof FORMS)[number]["value"];
export type Scale = (typeof SCALES)[number]["value"];

export interface GenerateRequest {
  topic: string;
  mechanism: Mechanism;
  tone: Tone;
  form: Form;
  scale: Scale;
  count: number;
}

export interface Joke {
  mechanism: string;
  tone: string;
  form: string;
  scale: string;
  text: string;
  analysis: string;
}

export interface GenerateResponse {
  violationSurfaces: string[];
  jokes: Joke[];
}
