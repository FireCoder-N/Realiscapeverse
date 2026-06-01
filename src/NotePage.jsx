import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

export default function NotePage({ file: propFile }) {
  const params = useParams()

  // --- normalize note name ---
  const raw = propFile || params.file || 'Pantheon'
  const noteName = raw.replace(/\.md$/, '')
  const fileName = `${noteName}.md`

  const [content, setContent] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)

    const url = `${import.meta.env.BASE_URL}notes/${fileName}`

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load ${url}`)
        return r.text()
      })
      .then(setContent)
      .catch((e) => {
        setContent(`# Error\nCould not load note: ${fileName}`)
        setError(e.message)
      })
  }, [fileName])

  return (
    <main>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          // --- internal markdown navigation ---
          a: ({ href = '', children }) => {
            if (href.endsWith('.md')) {
              const target = href
                .replace('.md', '')
                .replace('./', '')
                .replace(/^\/+/, '')

              return <Link to={`/notes/${target}`}>{children}</Link>
            }

            return <a href={href}>{children}</a>
          },

          // --- image handling (GitHub Pages safe) ---
          img: ({ src = '', alt = '', ...props }) => {
            const cleaned = src
              .replace(/^(\.\.\/)+/, '')
              .replace(/^\.?\//, '')

            const finalSrc = `${import.meta.env.BASE_URL}${cleaned}`

            return (
              <img
                src={finalSrc}
                alt={alt}
                style={{ maxWidth: '100%' }}
                {...props}
              />
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>

      {error && (
        <div style={{ color: 'red', marginTop: 20 }}>
          {error}
        </div>
      )}
    </main>
  )
}
