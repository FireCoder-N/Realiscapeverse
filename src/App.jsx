import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

export default function App() {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}notes/Pantheon.md`)
      .then(r => r.text())
      .then(setContent)
  }, [])

  return (
    <main style={{ maxWidth: 900, margin: '40px auto' }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          img: ({ src = '', alt = '', ...props }) => {
            const normalizedSrc = src.replace(/^(\.\.\/)+/, '/')

            return (
              <img
                src={normalizedSrc}
                alt={alt}
                style={{ width: 100 }}
                {...props}
              />
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </main>
  )
}
