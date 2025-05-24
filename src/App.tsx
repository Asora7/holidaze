// src/App.tsx
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import AppRoutes from './routes/AppRoutes'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;   /* full‐viewport wrapper */
`

const Main = styled.main`
  flex: 1;             /* take up all available space */
`

export default function App() {
  return (
    <Page>
      {/* Toasts sit in portal, but must be declared up here */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      {/* Your header + content */}
      <Main>
        <AppRoutes />
      </Main>
    </Page>
)
}
