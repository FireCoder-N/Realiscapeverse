import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const HOME_NOTE = "Pantheon.md";

export default function App() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/campaign/notes/" + HOME_NOTE)
      .then(r => r.text())
      .then(setContent);
  }, []);

  return (
    <div className="brewery">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
