import CytoscapeComponent from "react-cytoscapejs";

export default function GraphView({ graph }: any) {
  const elements: any[] = [];

  for (const a of graph.areas.values()) {
    elements.push({
      data: { id: a.id, label: a.name },
    });
  }

  for (const s of graph.species.values()) {
    elements.push({
      data: { id: s.id, label: s.name },
    });
  }

  for (const e of graph.edges) {
    elements.push({
      data: {
        source: e.areaId,
        target: e.speciesId,
        label: e.method,
      },
    });
  }

  return (
    <CytoscapeComponent
      elements={elements}
      style={{ height: "600px" }}
      layout={{ name: "cose" }}
    />
  );
}