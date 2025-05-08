// src/App.tsx
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh]">
        <Home />
      </main>
      <Footer />
    </>
  )
}
