import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GraphCanvas, darkTheme } from 'reagraph';
import { fantasyTheme } from './fantasyTheme'

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
      <GraphCanvas
        nodes={graph.nodes.map(n => ({
          id: n.id,
          label: n.id
        }))}
        edges={graph.links.map(l => ({
          id: `${l.source}-${l.target}`,
          source: l.source,
          target: l.target,
          label: ''
        }))}
        theme={fantasyTheme}
        animated={true}
        edgeInterpolation="curved"
        labelType="all"
        onNodeClick={(node) =>
          navigate(`/notes/${node.id}`)
        }
      />
    </div>
  )
}