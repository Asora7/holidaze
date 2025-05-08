// src/pages/Home.tsx
import styled from 'styled-components'

// A quick styled-component
const FancyBox = styled.div`
  padding: 1rem;
  background: palevioletred;
  color: white;
  border-radius: 0.5rem;
  font-family: Poppins, sans-serif;
`

export default function Home() {
  return (
    <div className="p-4">
      {/* Bootstrap button */}
      <button className="btn btn-primary mb-3">
        🚀 Bootstrap Button
      </button>

      {/* styled-components box */}
      <FancyBox>
        🎨 This is a styled-component box
      </FancyBox>
    </div>
  )
}


