import { useState } from "react";

import AddAreaForm from "./components/AddAreaForm";
import AddEncounterForm from "./components/AddEncounterForm";
import EncounterPanel from "./components/EncounterPanel";
import GraphView from "./components/GraphView";

import { EncounterGraph } from "./graph/EncounterGraph";

export default function App() {
  const [graph] = useState(() => new EncounterGraph());
  const [, setTick] = useState(0);

  const refresh = () => setTick(t => t + 1);

  return (
    <div>
      <h1>Encounter Tracker</h1>

      <AddAreaForm onAdd={(n: string) => {
        graph.addArea(n);
        refresh();
      }} />

      <AddEncounterForm
        areas={[...graph.areas.values()]}
        onAddEncounter={graph.addEncounter.bind(graph)}
      />

      <EncounterPanel graph={graph} />
      <GraphView graph={graph} />
    </div>
  );
}