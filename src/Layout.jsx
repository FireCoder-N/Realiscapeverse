import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { GraphCanvas, darkTheme } from 'reagraph';
import { fantasyTheme } from './fantasyTheme'
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

      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        <Outlet />
      </main>

    </div>
  )
}