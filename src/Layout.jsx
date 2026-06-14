import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ForceGraph2D from 'react-force-graph-2d'
import FolderTree from './FolderTree'

export default function Layout() {
  const [folders, setFolders] = useState(null)
  const [graph, setGraph] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}folders.json`)
      .then(r => r.json())
      .then(setFolders)

    fetch(`${import.meta.env.BASE_URL}graph.json`)
      .then(r => r.json())
      .then(setGraph)
  }, [])

  if (!folders || !graph) return null

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        {/* TOP: folder navigation */}
        <div className="sidebar-top">
          <FolderTree
            data={folders}
            onOpen={(file) => navigate(`/notes/${file}`)}
          />
        </div>

        {/* BOTTOM: graph */}
        <div className="sidebar-bottom">
            <div style={{ width: "100%", height: "100%" }}>
                <ForceGraph2D
                    graphData={graph}
                    backgroundColor="#0b0b10"
                    nodeColor={() => '#d8c08a'}
                    linkColor={() => '#6b3416'}
                    nodeLabel="id"
                    onNodeClick={(node) =>
                    navigate(`/notes/${node.id}`)
                    }
                />
            </div>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <Outlet />
      </main>

    </div>
  )
}