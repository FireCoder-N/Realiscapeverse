import { GraphCanvas } from "reagraph";
import { fantasyTheme } from "./fantasyTheme";

export default function GraphView({ graph, onNodeClick }) {
  const nodes = graph.nodes.map((n) => ({
    id: n.id,
    label: n.id,
  }));

  const seen = new Set();

  const edges = graph.links
    .filter((l) => l.source !== l.target)
    .filter((l) => {
      const id = `${l.source}-${l.target}`;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .map((l) => ({
      id: `${l.source}-${l.target}`,
      source: l.source,
      target: l.target,
      label: "",
    }));

  return (
    <GraphCanvas
      nodes={nodes}
      edges={edges}
      theme={fantasyTheme}
      animated={true}
      edgeInterpolation="curved"
      labelType="all"
      onNodeClick={onNodeClick}
    />
  );
}