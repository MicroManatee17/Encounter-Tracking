import { useState } from "react";

const METHODS = ["grass", "surf", "old-rod", "good-rod", "super-rod"];

export default function AddEncounterForm({ areas, onAddEncounter }: any) {
  const [areaId, setAreaId] = useState("");
  const [species, setSpecies] = useState("");
  const [family, setFamily] = useState("");
  const [method, setMethod] = useState("grass");
  const [weight, setWeight] = useState(1);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!areaId || !species || !family) return;

        onAddEncounter(areaId, species, family, method, weight);

        setSpecies("");
      }}
    >
      <select value={areaId} onChange={e => setAreaId(e.target.value)}>
        <option value="">Select area</option>
        {areas.map((a: any) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      <select value={method} onChange={e => setMethod(e.target.value)}>
        {METHODS.map(m => (
          <option key={m}>{m}</option>
        ))}
      </select>

      <input
        placeholder="Species"
        value={species}
        onChange={e => setSpecies(e.target.value)}
      />

      <input
        placeholder="Family"
        value={family}
        onChange={e => setFamily(e.target.value)}
      />

      <input
        type="number"
        value={weight}
        onChange={e => setWeight(Number(e.target.value))}
      />

      <button>Add Encounter</button>
    </form>
  );
}