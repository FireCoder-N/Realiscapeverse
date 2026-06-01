import { Routes, Route } from 'react-router-dom'
import NotePage from './NotePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NotePage file="Pantheon.md" />} />
      <Route path="/notes/:file" element={<NotePage />} />
    </Routes>
  )
}
