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

export const TARGETS = [
  { value: "auto", label: "Auto", description: "Systém vybere nejlepší" },
  { value: "nikdo", label: "Nikdo", description: "Pozorování, situační humor" },
  { value: "system", label: "Systém", description: "Instituce, byrokracie, pravidla" },
  { value: "archetyp", label: "Archetyp", description: "Typická role, stereotyp, profese" },
  { value: "konkretni", label: "Konkrétní", description: "Pojmenovaný terč, veřejná osoba" },
  { value: "self", label: "Self", description: "Sebeironický, na vlastní účet" },
] as const;

export const SCALES = [
  { value: "mild", label: "Mild", description: "Úsměv — wordplay, pozorování, nulová oběť" },
  { value: "medium", label: "Medium", description: "Smích — jasné porušení normy, nikdo terčem osobně" },
  { value: "sharp", label: "Sharp", description: "Výdech — terč existuje, ostré, zachraňuje distance" },
  { value: "dark", label: "Dark", description: "Šok — tabu, provokace, benign jen přes absurditu" },
  { value: "brutal", label: "Brutal", description: "Mráz — extrém bez brzd, funguje jen přes totální nereálnost" },
] as const;

export type Mechanism = (typeof MECHANISMS)[number]["value"];
export type Tone = (typeof TONES)[number]["value"];
export type Form = (typeof FORMS)[number]["value"];
export type Target = (typeof TARGETS)[number]["value"];
export type Scale = (typeof SCALES)[number]["value"];

export interface GenerateRequest {
  topic: string;
  mechanism: Mechanism;
  tone: Tone;
  form: Form;
  target: Target;
  scale: Scale;
  count: number;
}

export interface Joke {
  mechanism: string;
  tone: string;
  form: string;
  target: string;
  scale: string;
  text: string;
  analysis: string;
}

export interface GenerateResponse {
  violationSurfaces: string[];
  jokes: Joke[];
}
