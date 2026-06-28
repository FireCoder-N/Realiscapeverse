import { useState } from "react"

export default function FolderTree({ data, onOpen }) {
  return (
    <div className="folder-tree">
      {Object.values(data.children).map((node) => (
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

  function openFolderNote() {
    if (!node.folderNote) return
    onOpen(node.folderNote.title)
  }

  function openNote(note) {
    if (!note) return
    onOpen(note.title)
  }

  return (
    <div className="folder-node">

      {/* Folder header */}
      <div
        className="folder-title"
        style={{ display: "flex", paddingLeft: depth * 12 }}
      >
        {/* toggle only */}
        <span
          style={{ cursor: "pointer", marginRight: 6 }}
          onClick={() => setOpen(!open)}
        >
          {open ? "🗁" : "🗀"}
        </span>

        {/* folder name -> folderNote only */}
        <span
          style={{ cursor: node.folderNote ? "pointer" : "default" }}
          onClick={openFolderNote}
        >
          {node.name}
        </span>
      </div>

      {open && (
        <div className="folder-children">

          {/* notes ONLY (folderNote is intentionally NOT rendered) */}
          {node.notes?.map((note) => (
            <div
              key={note.file}
              className="note-link"
              style={{ paddingLeft: depth * 12 + 16 }}
              onClick={() => openNote(note)}
            >
              🗒 {note.title}
            </div>
          ))}

          {/* subfolders */}
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