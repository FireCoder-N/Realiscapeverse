import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FolderTree from "./FolderTree";
import GraphView from "./GraphView";

export default function Layout() {
  const [folders, setFolders] = useState(null);
  const [graph, setGraph] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}folders.json`)
      .then((r) => r.json())
      .then(setFolders);

    fetch(`${import.meta.env.BASE_URL}graph.json`)
      .then((r) => r.json())
      .then(setGraph);
  }, []);

  if (!folders || !graph) return null;

  return (
    <div className="layout">
      <button
        className="burger"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>

        {/* header row inside sidebar */}
        <div className="sidebar-header">
          <h2 style={{ fontFamily: '"Comic Sans MS", cursive, serif' }}>
            <em>Realiscapeverse</em>
          </h2>
        </div>


        <div className="sidebar-top">
          <FolderTree
            data={folders}
            onOpen={(file) => navigate(`/notes/${file}`)}
          />
        </div>

        <div className="sidebar-bottom">
          <GraphView
            graph={graph}
            onNodeClick={(node) => navigate(`/notes/${node.id}`)}
          />
        </div>
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}