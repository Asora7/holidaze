// src/App.tsx
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  return (
    // full-view height, column flex so footer stays at bottom
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* flex-grow keeps footer pushed to bottom */}
      <main className="flex-grow-1">
        <Home />
      </main>

      <Footer />
    </div>
  )
}
