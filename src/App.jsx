import { Routes, Route } from 'react-router-dom'
import NotePage from './NotePage'
import HomePage from './HomePage'
import Layout from './Layout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/:file" element={<NotePage />} />
      </Route>
    </Routes>
  )
}
