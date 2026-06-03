import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SupportoTecnico from './pages/SupportoTecnico/SupportoTecnico.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/supporto" element={<SupportoTecnico />} />
        <Route path="/*" element={<Navigate to="/supporto" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
