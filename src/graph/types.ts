export type EncounterMethod =
  | "grass"
  | "surf"
  | "old-rod"
  | "good-rod"
  | "super-rod";

export type AreaNode = {
  id: string;
  name: string;
};

export type PokemonSpecies = {
  id: string;
  name: string;
  familyId: string;
};

export type EvolutionFamily = {
  id: string;
  members: string[];
};

export type EncounterEdge = {
  areaId: string;
  speciesId: string;
  method: EncounterMethod;
  weight: number;
};