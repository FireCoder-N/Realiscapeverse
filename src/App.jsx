import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function App() {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}notes/Pantheon.md`)
      .then(r => r.text())
      .then(setContent)
      .catch(err => setText(String(err)))
  }, [])

  return (
    <main style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '20px'
    }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </main>
  )
}
