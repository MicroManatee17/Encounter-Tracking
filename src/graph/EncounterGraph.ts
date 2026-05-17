import {
  AreaNode,
  PokemonSpecies,
  EvolutionFamily,
  EncounterEdge,
  EncounterMethod,
} from "./types";

export class EncounterGraph {
  areas = new Map<string, AreaNode>();
  species = new Map<string, PokemonSpecies>();
  families = new Map<string, EvolutionFamily>();

  edges: EncounterEdge[] = [];

  caughtFamilies = new Set<string>();

  addArea(name: string) {
    const id = crypto.randomUUID();
    this.areas.set(id, { id, name });
    return id;
  }

  addFamily(name: string) {
    const id = `${name.toLowerCase()}_family`;

    if (!this.families.has(id)) {
      this.families.set(id, {
        id,
        members: [],
      });
    }

    return id;
  }

  addSpecies(name: string, familyName: string) {
    const existing = [...this.species.values()].find(
      s => s.name.toLowerCase() === name.toLowerCase()
    );

    if (existing) return existing.id;

    const familyId = this.addFamily(familyName);

    const id = crypto.randomUUID();

    this.species.set(id, {
      id,
      name,
      familyId,
    });

    this.families.get(familyId)!.members.push(id);

    return id;
  }

  addEncounter(
    areaId: string,
    species: string,
    family: string,
    method: EncounterMethod,
    weight: number = 1
  ) {
    const speciesId = this.addSpecies(species, family);

    this.edges.push({
      areaId,
      speciesId,
      method,
      weight,
    });
  }

  catchPokemon(speciesId: string) {
    const species = this.species.get(speciesId);
    if (!species) return;

    this.caughtFamilies.add(species.familyId);
  }

  getEncountersForArea(areaId: string, method?: EncounterMethod) {
    return this.edges
      .filter(e => e.areaId === areaId && (!method || e.method === method))
      .map(e => ({
        ...e,
        species: this.species.get(e.speciesId)!,
      }));
  }

  getEncounterOdds(areaId: string, method: EncounterMethod) {
    const encounters = this.edges.filter(
      e => e.areaId === areaId && e.method === method
    );

    const total = encounters.reduce((s, e) => s + e.weight, 0);

    return encounters.map(e => {
      const s = this.species.get(e.speciesId)!;

      return {
        speciesId: s.id,
        name: s.name,
        familyId: s.familyId,
        probability: e.weight / total,
      };
    });
  }
}