import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// Change this to your entry note
const HOME_NOTE = "Pantheon.md";

// Base path works for both dev and GitHub Pages
const BASE = import.meta.env.DEV
  ? ""
  : "/Realiscapeverse";

export default function App() {
  const [content, setContent] = useState("");
  const [currentNote, setCurrentNote] = useState(HOME_NOTE);

  useEffect(() => {
    loadNote(HOME_NOTE);
  }, []);

  function loadNote(noteFile) {
    fetch(`${BASE}/campaign/notes/${noteFile}`)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load ${noteFile}`);
        return r.text();
      })
      .then(setContent)
      .catch((err) => {
        console.error(err);
        setContent(`# Error\nCould not load note: ${noteFile}`);
      });

    setCurrentNote(noteFile);
  }

  return (
    <div className="app">
      <div className="header">
        <div className="title">Realiscape</div>
        <div className="subtitle">{currentNote}</div>
      </div>

      <div className="content">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => {
              // future-proof internal linking system
              if (href?.endsWith(".md")) {
                const target = href.split("/").pop();
                return (
                  <button
                    className="link"
                    onClick={() => loadNote(target)}
                  >
                    {children}
                  </button>
                );
              }

              return (
                <a href={href} target="_blank" rel="noreferrer">
                  {children}
                </a>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
