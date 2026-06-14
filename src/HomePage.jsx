import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ForceGraph2D from 'react-force-graph-2d'

export default function HomePage() {
  const [graph, setGraph] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}graph.json`)
      .then(r => r.json())
      .then(setGraph)
  }, [])

  if (!graph) {
    return <div>Loading world...</div>
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ForceGraph2D
        graphData={graph}
        backgroundColor="#0b0b10"
        nodeColor={() => "#d8c08a"}
        linkColor={() => "#6b3416"}
        linkWidth={1.2}
        d3VelocityDecay={0.15}
        cooldownTicks={100}
        linkDirectionalParticles={1}
        linkDirectionalParticleSpeed={0.01}
        nodeRelSize={6}
        nodeLabel="id"
        onNodeClick={(node) => {
            navigate(`/notes/${node.id}`)
        }}
        // onEngineTick={(engine) => {
        //     engine
        //     .force('x', null)
        //     .force('y', null)
        // }}
      />
    </div>
  )
}