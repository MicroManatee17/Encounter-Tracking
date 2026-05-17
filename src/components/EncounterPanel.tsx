export default function EncounterPanel({ graph }: any) {
  return (
    <div>
      {[...graph.areas.values()].map((area: any) => (
        <div key={area.id}>
          <h3>{area.name}</h3>

          {["grass", "surf", "old-rod", "good-rod", "super-rod"].map(method => {
            const odds = graph.getEncounterOdds(area.id, method);

            if (!odds.length) return null;

            return (
              <div key={method}>
                <h4>{method}</h4>

                {odds.map((o: any) => (
                  <div key={o.speciesId}>
                    {o.name} — {(o.probability * 100).toFixed(1)}%
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}