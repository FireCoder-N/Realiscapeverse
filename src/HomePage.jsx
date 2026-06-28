import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GraphView from "./GraphView";

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
    <GraphView
      graph={graph}
      onNodeClick={(node) => navigate(`/notes/${node.id}`)}
    />
  )
}