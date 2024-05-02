import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import CosasPorHacer from "./pages/CosasPorHacer"
import MisApuntes from "./pages/MisApuntes"

function App() {

  return (
    <>
    <Router>
      <Header />
      <main className="p-10">
        <Routes>
          <Route path="/" element={<CosasPorHacer />} />
          <Route path="misApuntes" element={<MisApuntes />} />
        </Routes>
      </main>
    </Router>
    </>
  )
}

export default App
