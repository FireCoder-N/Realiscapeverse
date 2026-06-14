import { useState } from "react"

export default function FolderTree({ data, onOpen }) {
  return (
    <div className="folder-tree">
      {Object.values(data).map((node) => (
        <FolderNode
          key={node.name}
          node={node}
          onOpen={onOpen}
          depth={0}
        />
      ))}
    </div>
  )
}

function FolderNode({ node, onOpen, depth }) {
  const [open, setOpen] = useState(true)

  const hasChildren =
    node.children &&
    Object.keys(node.children).length > 0

  function openNote(file) {
    if (!file) return

    const noteName = file
        .split("/")
        .pop()
        .replace(/\.md$/, "")

    onOpen(noteName)
   }

  return (
    <div className="folder-node">

      {/* Folder header */}
      <div
        className="folder-title"
        style={{ paddingLeft: depth * 12 }}
        onClick={() => setOpen(!open)}
      >
        📁 {node.name}
      </div>

      {open && (
        <div className="folder-children">

          {/* Folder note = ENTRY POINT */}
          {node.folderNote && (
            <div
              className="note-link folder-note"
              style={{ paddingLeft: depth * 12 + 12 }}
              onClick={() => openNote(node.folderNote)}
            >
              📄 {node.name}
            </div>
          )}

          {/* Subfolders */}
          {hasChildren &&
            Object.values(node.children).map((child) => (
              <FolderNode
                key={child.name}
                node={child}
                onOpen={onOpen}
                depth={depth + 1}
              />
            ))}
        </div>
      )}
    </div>
  )
}