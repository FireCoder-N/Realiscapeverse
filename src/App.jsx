import { Routes, Route } from 'react-router-dom'
import NotePage from './NotePage'
import HomePage from './HomePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/notes/:file" element={<NotePage />} />
    </Routes>
  )
}
